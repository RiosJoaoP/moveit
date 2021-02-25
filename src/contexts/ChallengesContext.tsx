import { createContext } from 'react';
import { useState } from 'react';
import { ReactNode } from 'react';

import challenges from '../../challenges.json';

export const ChallengesContext = createContext({} as ChallengeContextData);

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengeContextData {
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
}

interface ChallengesProviderProps {
    children: React.ReactNode;
}

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    
    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);  
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    return (
        <ChallengesContext.Provider 
            value={{ 
                level,
                currentExperience,
                experienceToNextLevel,
                challengesCompleted,
                activeChallenge,
                levelUp,
                startNewChallenge,
                resetChallenge
            }}
        >
            {children}
        </ChallengesContext.Provider>
    )
}