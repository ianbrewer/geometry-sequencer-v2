import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { X, Mail, Lock, Loader2, ArrowLeft } from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialError?: string | null;
    initialMessage?: string | null;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess, initialError, initialMessage }) => {
    const [view, setView] = useState<'login' | 'signup' | 'reset'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(initialError || null);
    const [message, setMessage] = useState<string | null>(initialMessage || null);

    // Reset state when modal opens/closes or props change
    React.useEffect(() => {
        if (isOpen) {
            if (initialError) setError(initialError);
            if (initialMessage) setMessage(initialMessage);
        } else {
            // Optional: reset on close
            // setError(null);
            // setMessage(null);
        }
    }, [isOpen, initialError, initialMessage]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        try {
            if (view === 'login') {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                onSuccess();
                onClose();
            } else if (view === 'signup') {
                const { data, error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;

                if (data && !data.session) {
                    setMessage('Account created! Please check your email to confirm your account before signing in.');
                } else {
                    onSuccess();
                    onClose();
                }
            } else if (view === 'reset') {
                const { error } = await supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: window.location.origin,
                });
                if (error) throw error;
                setMessage('Password reset email sent. Check your inbox.');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-6 w-96 shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                >
                    <X size={16} />
                </button>

                <div className="mb-6 text-center">
                    <h2 className="text-xl font-bold text-[#D4AF37] tracking-widest uppercase mb-2">
                        {view === 'login' && 'Welcome Back'}
                        {view === 'signup' && 'Join Ritual'}
                        {view === 'reset' && 'Reset Password'}
                    </h2>
                    <p className="text-xs text-white/40">
                        {view === 'reset' ? 'Enter your email to receive reset instructions.' : 'Sign in to access your cloud library.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded px-10 py-2 text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
                            required
                        />
                    </div>

                    {view !== 'reset' && (
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded px-10 py-2 text-white placeholder-white/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
                                required
                            />
                        </div>
                    )}

                    {error && (
                        <div className="text-red-400 text-xs bg-red-400/10 p-2 rounded border border-red-400/20 text-center">
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="text-green-400 text-xs bg-green-400/10 p-2 rounded border border-green-400/20 text-center">
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black font-bold py-2 rounded uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                    >
                        {loading && <Loader2 size={16} className="animate-spin" />}
                        {view === 'login' && 'Sign In'}
                        {view === 'signup' && 'Sign Up'}
                        {view === 'reset' && 'Send Reset Link'}
                    </button>
                </form>

                <div className="mt-6 flex flex-col gap-2 items-center text-xs text-white/40">
                    {view === 'login' && (
                        <>
                            <button onClick={() => setView('reset')} className="hover:text-white transition-colors">
                                Forgot Password?
                            </button>
                            <div className="w-full h-px bg-white/5 my-2" />
                            <span>Don't have an account? <button onClick={() => setView('signup')} className="text-[#D4AF37] hover:underline">Sign Up</button></span>
                        </>
                    )}
                    {view === 'signup' && (
                        <span>Already have an account? <button onClick={() => setView('login')} className="text-[#D4AF37] hover:underline">Sign In</button></span>
                    )}
                    {view === 'reset' && (
                        <button onClick={() => setView('login')} className="flex items-center gap-1 hover:text-white transition-colors">
                            <ArrowLeft size={12} />
                            Back to Login
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
