import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const inputStyle: React.CSSProperties = {
  width: '100%',
  backgroundColor: 'transparent',
  border: '1px solid var(--border)',
  padding: '12px 14px',
  color: 'var(--fg)',
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
};

const labelStyle: React.CSSProperties = {
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: '10px',
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'var(--fg-3)',
  marginBottom: '8px',
  display: 'block',
};

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus('loading');

    // Simulate form submission (no actual backend)
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }, 1200);
  }, [validate]);

  const getInputBorderColor = (fieldName: keyof FormErrors): string => {
    if (errors[fieldName]) return 'rgba(239,68,68,0.6)';
    return 'var(--border)';
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.0, 0, 0.2, 1] as [number, number, number, number],
      }}
      style={{
        backgroundColor: 'var(--bg-2)',
        border: '1px solid var(--border)',
        padding: '40px',
      }}
      className="max-md:p-6"
    >
      {/* Name Field */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-6"
      >
        <label style={labelStyle}>name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
          style={{
            ...inputStyle,
            borderColor: getInputBorderColor('name'),
          }}
          onFocus={(e) => {
            if (!errors.name) {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.boxShadow = '0 0 0 1px var(--accent-glow-soft)';
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = getInputBorderColor('name');
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        <AnimatePresence>
          {errors.name && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-1 font-mono"
              style={{ fontSize: '10px', color: '#ef4444' }}
            >
              {errors.name}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Email Field */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.16 }}
        className="mb-6"
      >
        <label style={labelStyle}>email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          style={{
            ...inputStyle,
            borderColor: getInputBorderColor('email'),
          }}
          onFocus={(e) => {
            if (!errors.email) {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.boxShadow = '0 0 0 1px var(--accent-glow-soft)';
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = getInputBorderColor('email');
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        <AnimatePresence>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-1 font-mono"
              style={{ fontSize: '10px', color: '#ef4444' }}
            >
              {errors.email}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Subject Field */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.22 }}
        className="mb-6"
      >
        <label style={labelStyle}>subject</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="what's this about?"
          style={{
            ...inputStyle,
            borderColor: getInputBorderColor('subject'),
          }}
          onFocus={(e) => {
            if (!errors.subject) {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.boxShadow = '0 0 0 1px var(--accent-glow-soft)';
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = getInputBorderColor('subject');
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        <AnimatePresence>
          {errors.subject && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-1 font-mono"
              style={{ fontSize: '10px', color: '#ef4444' }}
            >
              {errors.subject}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Message Field */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.28 }}
        className="mb-8"
      >
        <label style={labelStyle}>message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="describe your project, problem, or question..."
          rows={5}
          style={{
            ...inputStyle,
            borderColor: getInputBorderColor('message'),
            minHeight: '140px',
            resize: 'vertical' as const,
          }}
          onFocus={(e) => {
            if (!errors.message) {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.boxShadow = '0 0 0 1px var(--accent-glow-soft)';
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = getInputBorderColor('message');
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        <AnimatePresence>
          {errors.message && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-1 font-mono"
              style={{ fontSize: '10px', color: '#ef4444' }}
            >
              {errors.message}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.34 }}
      >
        <motion.button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="font-mono w-full sm:w-auto"
          style={{
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.06em',
            padding: '14px 32px',
            border: 'none',
            cursor: status === 'idle' || status === 'error' ? 'pointer' : 'default',
            backgroundColor:
              status === 'success'
                ? 'rgba(74,222,128,0.15)'
                : status === 'error'
                  ? 'rgba(239,68,68,0.15)'
                  : 'var(--accent)',
            color:
              status === 'success'
                ? '#4ade80'
                : status === 'error'
                  ? '#ef4444'
                  : 'var(--fg)',
            borderColor:
              status === 'success'
                ? 'rgba(74,222,128,0.3)'
                : status === 'error'
                  ? 'rgba(239,68,68,0.3)'
                  : 'transparent',
            borderStyle: 'solid',
            borderWidth: '1px',
          }}
          whileHover={
            status === 'idle'
              ? {
                  y: -1,
                  boxShadow: '0 4px 20px var(--accent-glow-soft)',
                }
              : {}
          }
          whileTap={status === 'idle' ? { scale: 0.98 } : {}}
        >
          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.span
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                send message &rarr;
              </motion.span>
            )}
            {status === 'loading' && (
              <motion.span
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2"
              >
                <span
                  className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"
                />
                sending...
              </motion.span>
            )}
            {status === 'success' && (
              <motion.span
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                message sent ✓
              </motion.span>
            )}
            {status === 'error' && (
              <motion.span
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                something went wrong. try again.
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        <AnimatePresence>
          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 font-sans"
              style={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.72)',
              }}
            >
              Message sent! I'll get back to you soon.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.form>
  );
}
