import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const articles: Record<string, {title: string; accent: string; date: string; html: string}> = {
  'nsenter-bridge': {
    title: 'The Container That', accent: 'Escaped',
    date: 'Edward Twumasi · July 2026',
    html: `<p style="font-size:1.05rem;max-width:660px">GroundControl is a VPS fleet control plane. It lives inside a Docker container on the very server it manages. When you click "Restart Service" in the dashboard, it should run <code>systemctl restart caddy</code> on the host. But containers are jails — and <code>systemctl</code> does not exist inside one.</p>
<p style="font-size:1.05rem;max-width:660px">This is the story of how I broke out.</p>

<h3 style="font-size:1.7rem;font-weight:800;letter-spacing:-.03em;margin:56px 0 16px">The problem no one talks about</h3>

<p>Every self-hosted dashboard hits this wall. You containerize your app — clean, portable, one <code>docker compose up</code> — and immediately lose the ability to manage the host. The terminal reports <code>command not found</code> for tools that are clearly installed outside. Install buttons fail silently. The dashboard becomes a viewer, not a cockpit.</p>

<p>The conventional answers all suck:</p>

<ul style="list-style:none;padding:0;margin:24px 0">
<li style="padding:16px 20px 16px 28px;margin-bottom:8px;background:rgba(0,0,0,0.025);border-radius:var(--radius);border-left:3px solid var(--blue);font-size:.9rem;line-height:1.65;color:var(--muted)"><strong style="color:var(--ink)">Run with <code>--pid=host</code>.</strong> Works until you forget to mention it in <code>docker-compose.yml</code> and spend an hour debugging why it works on your machine but not in CI.</li>
<li style="padding:16px 20px 16px 28px;margin-bottom:8px;background:rgba(0,0,0,0.025);border-radius:var(--radius);border-left:3px solid var(--acid);font-size:.9rem;line-height:1.65;color:var(--muted)"><strong style="color:var(--ink)">SSH to localhost.</strong> Clean architecturally — set up keys, configure sshd, store the key securely. Now your dashboard has an SSH client and a key management problem.</li>
<li style="padding:16px 20px 16px 28px;margin-bottom:8px;background:rgba(0,0,0,0.025);border-radius:var(--radius);border-left:3px solid var(--orange);font-size:.9rem;line-height:1.65;color:var(--muted)"><strong style="color:var(--ink)">Install a host agent.</strong> The enterprise answer. A sidecar process on the host that listens for commands from the container. Now you have two things to deploy, two things to update, and a new attack surface.</li>
</ul>

<p>Each one adds friction. Each one betrays the promise of "one <code>docker compose up</code>."</p>

<h3 style="font-size:1.7rem;font-weight:800;letter-spacing:-.03em;margin:56px 0 16px">Docker is already root</h3>

<p>If you mount the Docker socket (<code>/var/run/docker.sock</code>) into a container, that container can create, start, and stop other containers. And if you can create a container, you can give it <code>--pid=host</code> and <code>--privileged</code> flags that the <em>parent</em> container does not have. You can spawn a one-shot privileged helper that enters the host namespaces.</p>

<blockquote style="border-left:3px solid var(--blue);padding:4px 0 4px 24px;margin:32px 0;color:var(--muted);font-style:italic;font-size:1.05rem;line-height:1.7">The Docker socket is root-equivalent. Use it to delegate privilege to an ephemeral helper, not to the dashboard itself.</blockquote>

<pre style="background:var(--paper);padding:28px 30px;border-radius:var(--radius);font-size:.78rem;line-height:1.7;font-family:'DM Mono',monospace;overflow-x:auto;margin:24px 0;border:1px solid var(--line)">docker run --rm --pid=host --privileged \\
  -v /:/host \\
  alpine:latest \\
  nsenter -t 1 -m -u -i -n -p -- \\
  sh -c '&lt;user-command&gt;'</pre>

<ol style="margin:20px 0 20px 24px;color:var(--muted)">
<li style="margin-bottom:10px;line-height:1.75"><strong style="color:var(--ink)"><code>docker run --rm</code></strong> — create a one-shot container, auto-remove when done</li>
<li style="margin-bottom:10px;line-height:1.75"><strong style="color:var(--ink)"><code>--pid=host</code></strong> — join the host PID namespace, see all host processes</li>
<li style="margin-bottom:10px;line-height:1.75"><strong style="color:var(--ink)"><code>--privileged</code></strong> — full capabilities, no restrictions</li>
<li style="margin-bottom:10px;line-height:1.75"><strong style="color:var(--ink)"><code>-v /:/host</code></strong> — mount the host root filesystem into the container</li>
<li style="margin-bottom:10px;line-height:1.75"><strong style="color:var(--ink)"><code>nsenter -t 1 -m -u -i -n -p</code></strong> — enter PID 1's mount, UTS, IPC, network, and PID namespaces. Essentially "become the host."</li>
<li style="margin-bottom:10px;line-height:1.75"><strong style="color:var(--ink)"><code>sh -c '&lt;command&gt;'</code></strong> — run whatever the user typed, as root, on the host</li>
</ol>

<p>The helper container starts, enters the host namespaces, runs the command, and exits. Ephemeral — no state, no lingering process. The dashboard container never gets <code>--privileged</code> itself. It delegates to a throwaway container that does the work and disappears.</p>

<h3 style="font-size:1.7rem;font-weight:800;letter-spacing:-.03em;margin:56px 0 16px">Why this is clean</h3>

<ul style="margin:20px 0;color:var(--muted);line-height:1.7">
<li style="margin-bottom:10px"><strong style="color:var(--ink)">Zero setup.</strong> The default <code>docker-compose.yml</code> just mounts the socket. No <code>--pid=host</code>, no SSH keys, no host agent. One file, one command.</li>
<li style="margin-bottom:10px"><strong style="color:var(--ink)">Least privilege.</strong> The dashboard container has only what it needs. Privilege is granted per-command. The helper lives for milliseconds.</li>
<li style="margin-bottom:10px"><strong style="color:var(--ink)">Auditable.</strong> Every host command goes through <code>execOnVps()</code>, which logs the command, the helper container ID, and the result.</li>
<li style="margin-bottom:10px"><strong style="color:var(--ink)">Same abstraction, local or remote.</strong> <code>execOnVps()</code> does not care whether the VPS is localhost or remote. The SSH path uses <code>node-ssh</code>; the local path uses the nsenter bridge. Same interface.</li>
</ul>

<h3 style="font-size:1.7rem;font-weight:800;letter-spacing:-.03em;margin:56px 0 16px">What this unlocks</h3>

<p>Once you can run host commands from inside Docker, the dashboard becomes a real cockpit:</p>

<ul style="margin:20px 0;color:var(--muted);line-height:1.7">
<li>Restart systemd services (<code>systemctl restart caddy</code>)</li>
<li>Install packages (<code>apk add</code>, <code>apt install</code>)</li>
<li>Run <code>kubectl</code>, <code>terraform</code>, <code>docker compose</code> — tools that live on the host</li>
<li>Read host files (<code>/etc/caddy/Caddyfile</code>, <code>/proc/loadavg</code>)</li>
<li>Execute deployments touching host directories (<code>/opt</code>, <code>/var/www</code>)</li>
</ul>

<p style="margin-top:40px">GroundControl is live at <a href="https://groundcontrol.serendepify.com" target="_blank" style="color:var(--blue);font-weight:700;text-underline-offset:4px">groundcontrol.serendepify.com</a>. Source at <a href="https://github.com/teckedd-code2save/groundcontrol" target="_blank" style="color:var(--blue);font-weight:700;text-underline-offset:4px">github.com/teckedd-code2save/groundcontrol</a>.</p>

<p style="margin-top:56px;padding-top:28px;border-top:1px solid var(--line);color:var(--muted);font-size:.82rem">If you are building infrastructure tooling and wrestling with container-host boundaries, reach out: <a href="mailto:edwardktwumasi1000@gmail.com" style="color:var(--blue)">edwardktwumasi1000@gmail.com</a></p>`
  },
};

export default function ArticleViewer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const article = id ? articles[id] : null;

  if (!article) return (
    <div className="page-hero"><div className="page-shell"><p className="lede">Article not found. <span style={{color:'var(--blue)',cursor:'pointer'}} onClick={() => navigate('/articles')}>Back to articles.</span></p></div></div>
  );

  return (
    <div>
      <header className="page-hero" style={{ paddingBottom: '48px' }}>
        <motion.div className="page-shell" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
          <p className="eyebrow" style={{cursor:'pointer'}} onClick={() => navigate('/articles')}>← Articles</p>
          <h1 className="display" style={{ maxWidth: '800px' }}>{article.title}<br /><span style={{ color: 'var(--blue)' }}>{article.accent}</span></h1>
          <p className="lede" style={{ color: 'var(--muted)' }}>{article.date}</p>
        </motion.div>
      </header>

      <section className="editorial-section" style={{ paddingTop: '40px' }}>
        <div className="page-shell" style={{ maxWidth: '740px' }}>
          <div className="article-body" dangerouslySetInnerHTML={{ __html: article.html }}
            style={{ color: 'var(--ink)','--muted':'var(--muted)' } as React.CSSProperties}
          />
        </div>
      </section>
    </div>
  );
}
