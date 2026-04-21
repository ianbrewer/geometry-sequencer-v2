import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import AuthModal from './AuthModal';
import { Play, LogIn, Ghost } from 'lucide-react';

const LandingPage: React.FC = () => {
    const setView = useStore(s => s.setView);
    const user = useStore(s => s.user);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);

    // Check for auth errors in URL (e.g. from email link issues)
    React.useEffect(() => {
        const hash = window.location.hash;
        if (hash && hash.includes('error=')) {
            // Parse hash params
            const params = new URLSearchParams(hash.substring(1)); // remove #
            const errorDescription = params.get('error_description');
            const error = params.get('error');

            if (errorDescription || error) {
                setAuthError(errorDescription || error);
                setIsAuthModalOpen(true);
                // Clean URL
                window.history.replaceState(null, '', window.location.pathname);
            }
        }
    }, []);

    const handleGetStarted = () => {
        if (user) {
            setView('dashboard');
        } else {
            setIsAuthModalOpen(true);
        }
    };

    const handleGuestMode = () => {
        setView('editor');
    };

    return (
        <div className="min-h-screen bg-[#111] text-white flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-[#111] to-[#111] z-0" />

            <div className="relative z-10 text-center space-y-8 max-w-2xl px-6">
                <div className="space-y-4">
                    <h1 className="text-6xl font-bold tracking-[0.2em] uppercase text-[#D4AF37] mb-2 drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">
                        Ritual
                    </h1>
                    <p className="text-white/50 text-lg tracking-widest uppercase mb-12">
                        Sacred Geometry Sequencer
                    </p>
                </div>

                <div className="flex flex-col gap-4 items-center justify-center w-full max-w-xs mx-auto">
                    <button
                        onClick={handleGetStarted}
                        className="w-full group bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black px-8 py-4 rounded font-bold text-sm uppercase tracking-widest transition-all hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)] flex items-center justify-center gap-3"
                    >
                        {user ? (
                            <>
                                <Play size={18} />
                                Enter Studio
                            </>
                        ) : (
                            <>
                                <LogIn size={18} />
                                Sign In / Sign Up
                            </>
                        )}
                    </button>

                    {!user && (
                        <button
                            onClick={handleGuestMode}
                            className="w-full flex items-center justify-center gap-2 text-white/40 hover:text-white text-xs uppercase tracking-widest transition-colors py-2"
                        >
                            <Ghost size={14} />
                            Continue as Guest
                        </button>
                    )}
                </div>
            </div>

            <div className="absolute bottom-8 left-0 right-0 text-center text-white/20 text-[10px] uppercase tracking-widest">
                v1.0.0 • Sacred Geometry Engine
            </div>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => { setIsAuthModalOpen(false); setAuthError(null); }}
                onSuccess={() => setView('dashboard')}
                initialError={authError}
            />
        </div>
    );
};

export default LandingPage;
