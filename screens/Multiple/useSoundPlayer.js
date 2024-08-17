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
          console.error('Failed to load the correct sound', error);
          return;
        }
        setSoundCorrect(mySoundCorrect);
      });

      const mySoundWrong = new Sound('wrong.mp4', Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.error('Failed to load the wrong sound', error);
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
    } else {
      console.log('Sound not loaded', 'The correct sound is not loaded yet. Please try again later.');
    }
    console.log('Sound not loaded', 'The correct sound is not loaded yet. Please try again later.');
  };

  const playSoundWrong = () => {
    Vibration.vibrate(50);
    if (soundWrong) {
      soundWrong.play((success) => {
        if (!success) {
          console.error('Wrong sound did not play');
        }
      });
    } else {
      console.log('Sound not loaded', 'The wrong sound is not loaded yet. Please try again later.');
    }
    console.log('Sound not loaded', 'The correct sound is not loaded yet. Please try again later.');
  };

  return { playSoundCorrect, playSoundWrong };
};

export default useSoundPlayer;
