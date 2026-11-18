'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, User } from 'lucide-react';
import { Logo } from '@/components/logo';
import Link from 'next/link';

const steps = [
  { key: 'welcome', title: 'Welcome' },
  { key: 'basic', title: 'Basic Details' },
  { key: 'personal', title: 'Personal' },
  { key: 'education', title: 'Education' },
  { key: 'family', title: 'Family' },
  { key: 'culture', title: 'Culture' },
  { key: 'lifestyle', title: 'Lifestyle' },
  { key: 'personality', title: 'Personality' },
  { key: 'goals', title: 'Marriage Goals' },
  { key: 'preferences', title: 'Preferences' },
  { key: 'photos', title: 'Photos' },
  { key: 'review', title: 'Review' },
];

const personalityQuestions = [
  'How do you prefer to resolve disagreements?',
  'How important is personal space to you?',
  'How do you express care?',
  'What does a supportive marriage mean to you?',
  'How do you approach difficult conversations?',
];

export default function OnboardingPage() {
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState<Record<string, any>>({
    display_name: '', date_of_birth: '', gender: '', interested_in: [],
    city: '', state: '', country: 'India', preferred_language: 'English', marriage_intention: '',
    personality: {} as Record<string, string>,
  });

  const total = steps.length;
  const progress = ((current + 1) / total) * 100;
  const step = steps[current];

  const update = (key: string, value: any) => setData((d) => ({ ...d, [key]: value }));

  const next = () => current < total - 1 && setCurrent((c) => c + 1);
  const prev = () => current > 0 && setCurrent((c) => c - 1);

  const canProceed = () => {
    if (step.key === 'welcome') return true;
    if (step.key === 'basic') return data.display_name && data.date_of_birth && data.gender;
    if (step.key === 'review') return true;
    return true;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-found-blush to-white">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8 text-center">
          <Link href="/"><Logo className="mx-auto h-10 w-auto" /></Link>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-found-plum/70">Step {current + 1} of {total}</span>
            <span className="text-found-rose">{Math.round(progress)}% complete</span>
          </div>
          <div className="h-2 w-full rounded-full bg-found-ivory">
            <motion.div
              className="h-2 rounded-full bg-gradient-rose"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Steps indicator */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {steps.map((s, i) => (
            <button
              key={s.key}
              onClick={() => setCurrent(i)}
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all ${
                i === current
                  ? 'bg-gradient-rose text-white shadow-glow'
                  : i < current
                  ? 'bg-found-rose/20 text-found-rose'
                  : 'bg-found-ivory text-found-plum/40'
              }`}
            >
              {i < current ? <Check className="h-4 w-4" /> : i + 1}
            </button>
          ))}
        </div>

        {/* Step content */}
        <div className="card-premium min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.key}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {step.key === 'welcome' && (
                <div className="py-12 text-center">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-rose shadow-glow">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="mb-3 text-2xl font-display font-bold text-found-burgundy">Welcome to FOUND</h2>
                  <p className="mx-auto mb-8 max-w-md text-found-plum/70">
                    Let&apos;s create your profile. This thoughtful onboarding helps us understand
                    who you are and what you&apos;re looking for in a life partner.
                  </p>
                  <p className="text-sm text-found-plum/50">
                    Takes about 10-15 minutes. You can save and resume anytime.
                  </p>
                </div>
              )}

              {step.key === 'basic' && (
                <div className="space-y-5 py-4">
                  <h2 className="text-2xl font-display font-bold text-found-burgundy">Basic Details</h2>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-found-plum">Display Name</label>
                    <input value={data.display_name} onChange={(e) => update('display_name', e.target.value)} className="w-full rounded-xl border border-found-rose/20 bg-found-ivory px-4 py-3 focus:border-found-rose focus:outline-none" placeholder="How should we call you?" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-found-plum">Date of Birth</label>
                    <input type="date" value={data.date_of_birth} onChange={(e) => update('date_of_birth', e.target.value)} className="w-full rounded-xl border border-found-rose/20 bg-found-ivory px-4 py-3 focus:border-found-rose focus:outline-none" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-found-plum">Gender</label>
                    <select value={data.gender} onChange={(e) => update('gender', e.target.value)} className="w-full rounded-xl border border-found-rose/20 bg-found-ivory px-4 py-3 focus:border-found-rose focus:outline-none">
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="non_binary">Non-binary</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-found-plum">Interested In</label>
                    <div className="flex flex-wrap gap-2">
                      {['male', 'female', 'non_binary'].map((g) => (
                        <button key={g} type="button" onClick={() => {
                          const arr = data.interested_in.includes(g) ? data.interested_in.filter((x: string) => x !== g) : [...data.interested_in, g];
                          update('interested_in', arr);
                        }} className={`rounded-full px-4 py-2 text-sm transition-all ${data.interested_in.includes(g) ? 'bg-gradient-rose text-white' : 'bg-found-ivory text-found-plum/70'}`}>
                          {g.replace('_', ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-found-plum">City</label>
                      <input value={data.city} onChange={(e) => update('city', e.target.value)} className="w-full rounded-xl border border-found-rose/20 bg-found-ivory px-4 py-3 focus:border-found-rose focus:outline-none" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-found-plum">State</label>
                      <input value={data.state} onChange={(e) => update('state', e.target.value)} className="w-full rounded-xl border border-found-rose/20 bg-found-ivory px-4 py-3 focus:border-found-rose focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-found-plum">Marriage Intention</label>
                    <select value={data.marriage_intention} onChange={(e) => update('marriage_intention', e.target.value)} className="w-full rounded-xl border border-found-rose/20 bg-found-ivory px-4 py-3 focus:border-found-rose focus:outline-none">
                      <option value="">Select</option>
                      <option value="serious">Serious - ready for marriage</option>
                      <option value="exploring">Exploring - open to marriage</option>
                      <option value="not_sure">Not sure yet</option>
                    </select>
                  </div>
                </div>
              )}

              {step.key === 'personal' && (
                <div className="py-8 text-center text-found-plum/60">
                  <h2 className="mb-4 text-2xl font-display font-bold text-found-burgundy">Personal Details</h2>
                  <p>Height, languages, bio, interests, hobbies, and values.</p>
                  <p className="mt-4 text-sm">(Optional fields - Milestone 2 full implementation)</p>
                </div>
              )}

              {step.key === 'education' && (
                <div className="py-8 text-center text-found-plum/60">
                  <h2 className="mb-4 text-2xl font-display font-bold text-found-burgundy">Education & Career</h2>
                  <p>Qualifications, occupation, industry, career goals.</p>
                  <p className="mt-4 text-sm">(Optional fields - Milestone 2 full implementation)</p>
                </div>
              )}

              {step.key === 'family' && (
                <div className="py-8 text-center text-found-plum/60">
                  <h2 className="mb-4 text-2xl font-display font-bold text-found-burgundy">Family Background</h2>
                  <p>Family structure, values, living arrangements, involvement expectations.</p>
                  <p className="mt-4 text-sm">(Optional fields - Milestone 2 full implementation)</p>
                </div>
              )}

              {step.key === 'culture' && (
                <div className="py-8 text-center text-found-plum/60">
                  <h2 className="mb-4 text-2xl font-display font-bold text-found-burgundy">Culture & Traditions</h2>
                  <p>Religion, community, festivals, rituals, dietary practices.</p>
                  <p className="mt-4 text-sm">(Optional fields - Milestone 2 full implementation)</p>
                </div>
              )}

              {step.key === 'lifestyle' && (
                <div className="py-8 text-center text-found-plum/60">
                  <h2 className="mb-4 text-2xl font-display font-bold text-found-burgundy">Lifestyle</h2>
                  <p>Food, smoking, alcohol, sleep, travel, fitness, pets.</p>
                  <p className="mt-4 text-sm">(Optional fields - Milestone 2 full implementation)</p>
                </div>
              )}

              {step.key === 'personality' && (
                <div className="space-y-5 py-4">
                  <h2 className="text-2xl font-display font-bold text-found-burgundy">Personality & Understanding</h2>
                  <p className="text-found-plum/60">These optional questions help us understand you better.</p>
                  {personalityQuestions.map((q) => (
                    <div key={q}>
                      <label className="mb-2 block text-sm font-medium text-found-plum">{q}</label>
                      <textarea
                        value={data.personality?.[q] || ''}
                        onChange={(e) => update('personality', { ...data.personality, [q]: e.target.value })}
                        rows={2}
                        className="w-full rounded-xl border border-found-rose/20 bg-found-ivory px-4 py-3 focus:border-found-rose focus:outline-none"
                        placeholder="Your answer (optional)"
                      />
                    </div>
                  ))}
                </div>
              )}

              {step.key === 'goals' && (
                <div className="py-8 text-center text-found-plum/60">
                  <h2 className="mb-4 text-2xl font-display font-bold text-found-burgundy">Marriage Goals</h2>
                  <p>Timeline, location, family type, children preferences.</p>
                  <p className="mt-4 text-sm">(Optional fields - Milestone 2 full implementation)</p>
                </div>
              )}

              {step.key === 'preferences' && (
                <div className="py-8 text-center text-found-plum/60">
                  <h2 className="mb-4 text-2xl font-display font-bold text-found-burgundy">Partner Preferences</h2>
                  <p>Age range, location, values, and what matters most to you.</p>
                  <p className="mt-4 text-sm">(Optional fields - Milestone 2 full implementation)</p>
                </div>
              )}

              {step.key === 'photos' && (
                <div className="py-8 text-center">
                  <h2 className="mb-4 text-2xl font-display font-bold text-found-burgundy">Photos</h2>
                  <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-2xl border-2 border-dashed border-found-rose/30 bg-found-ivory">
                    <span className="text-found-plum/40">Upload photos</span>
                  </div>
                  <p className="text-found-plum/60">Add 1-6 photos. First photo is your profile picture.</p>
                  <p className="mt-4 text-sm text-found-plum/40">(Photo upload - Milestone 2 full implementation)</p>
                </div>
              )}

              {step.key === 'review' && (
                <div className="py-4">
                  <h2 className="mb-6 text-2xl font-display font-bold text-found-burgundy">Review Your Profile</h2>
                  <div className="space-y-4">
                    <div className="rounded-xl bg-found-ivory p-4">
                      <p className="text-xs font-medium text-found-rose uppercase">Display Name</p>
                      <p className="text-found-plum">{data.display_name || 'Not set'}</p>
                    </div>
                    <div className="rounded-xl bg-found-ivory p-4">
                      <p className="text-xs font-medium text-found-rose uppercase">Gender</p>
                      <p className="text-found-plum">{data.gender || 'Not set'}</p>
                    </div>
                    <div className="rounded-xl bg-found-ivory p-4">
                      <p className="text-xs font-medium text-found-rose uppercase">Location</p>
                      <p className="text-found-plum">{[data.city, data.state].filter(Boolean).join(', ') || 'Not set'}</p>
                    </div>
                    <div className="rounded-xl bg-found-ivory p-4">
                      <p className="text-xs font-medium text-found-rose uppercase">Marriage Intention</p>
                      <p className="text-found-plum">{data.marriage_intention || 'Not set'}</p>
                    </div>
                  </div>
                  <p className="mt-6 rounded-xl bg-found-lavender/40 p-4 text-sm text-found-plum/70">
                    You can edit any section after publishing. Complete onboarding to start discovering compatible profiles.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={prev}
            disabled={current === 0}
            className="btn-ghost disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          {current < total - 1 ? (
            <button
              onClick={next}
              disabled={!canProceed()}
              className="btn-primary disabled:opacity-50"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button className="btn-primary">
              <Check className="h-4 w-4" /> Complete Profile
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
