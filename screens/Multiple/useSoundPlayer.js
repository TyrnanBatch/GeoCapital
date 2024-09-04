// SoundPlayer.js
import { useState, useEffect } from 'react';
import Sound from 'react-native-sound';
import { Vibration, View } from 'react-native';

const useSoundPlayer = () => {
    const [soundCorrect, setSoundCorrect] = useState(null);
    const [soundWrong, setSoundWrong] = useState(null);

    useEffect(() => {
        const loadSound = () => {
            const mySoundCorrect = new Sound('correct.mp4', Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    return;
                }
                setSoundCorrect(mySoundCorrect);
            });

            const mySoundWrong = new Sound('wrong.mp4', Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    return;
                }
                setSoundWrong(mySoundWrong);
            });
        };
        loadSound();

        return () => {
            if (soundCorrect) {
                soundCorrect.release();
            }
            if (soundWrong) {
                soundWrong.release();
            }
        };
    }, []);

    const playSoundCorrect = () => {
        if (soundCorrect) {
            soundCorrect.play((success) => {
                if (!success) {
                    console.error('Correct sound did not play');
                }
            });
        }
    };

    const playSoundWrong = () => {
        if (soundWrong) {
            soundWrong.play((success) => {
                if (!success) {
                    console.error('Wrong sound did not play');
                }
            });
        }
    };

    return { playSoundCorrect, playSoundWrong };
};

export default useSoundPlayer;
