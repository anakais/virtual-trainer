import { ref, computed, watch, onMounted } from 'vue';

export const useWorkout = () => {
  // Load saved workout data from localStorage
  const loadWorkoutData = (workoutType) => {
    if (process.client) {
      const saved = localStorage.getItem(`workout_${workoutType}`);
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  };
  // Check if there's saved data for a workout type
  const hasWorkoutData = (workoutType) => {
    if (process.client) {
      return localStorage.getItem(`workout_${workoutType}`) !== null;
    }
    return false;
  };

  const getDefaultExercisesMeta = (workoutType) => {
    if (workoutType === 'upper') {
      return [
        {
          name: 'Pull-ups',
          emoji: '🏋️',
          description: 'Barra fixa - força de tração',
          tip: 'Mantenha o corpo reto e controle o movimento na descida',
        },
        {
          name: 'Australian Pull-ups',
          emoji: '🤸',
          description: 'Barra baixa - variação mais fácil',
          tip: 'Mantenha o corpo alinhado e puxe até o peito tocar a barra',
        },
        {
          name: 'Bíceps',
          emoji: '💪',
          description: 'Flexão de cotovelo - isolamento',
          tip: 'Mantenha os cotovelos fixos e controle o movimento',
        },
        {
          name: 'Push-ups',
          emoji: '🔄',
          description: 'Flexão de braço - peito e tríceps',
          tip: 'Mantenha o corpo reto e desça até quase tocar o chão',
        },
        {
          name: 'Shoulders',
          emoji: '🏋️',
          description: 'Desenvolvimento - ombros',
          tip: 'Mantenha a postura ereta e controle o movimento',
        },
      ];
    }
    if (workoutType === 'lower') {
      return [
        {
          name: 'Squats',
          emoji: '🏋️',
          description: 'Agachamento - quadríceps e glúteos',
          tip: 'Mantenha os pés na largura dos ombros e desça como se fosse sentar',
        },
        {
          name: 'Extensor',
          emoji: '💪',
          description: 'Extensão de perna - quadríceps',
          tip: 'Controle o movimento e não trave os joelhos no final',
        },
        {
          name: 'Flexor',
          emoji: '🦵',
          description: 'Curl de perna - posterior da coxa',
          tip: 'Mantenha o quadril estável e foque no movimento do joelho',
        },
        {
          name: 'Calves',
          emoji: '🦶',
          description: 'Elevação de panturrilha - gastrocnêmio',
          tip: 'Faça o movimento completo, subindo e descendo lentamente',
        },
        {
          name: 'Abs',
          emoji: '🔥',
          description: 'Abdominal - core e reto abdominal',
          tip: 'Mantenha o pescoço relaxado e foque em levantar os ombros',
        },
      ];
    }
    return [];
  };

  const getDefaultExercises = (workoutType) => {
    const meta = getDefaultExercisesMeta(workoutType);
    const defaults = {
      upper: {
        'Pull-ups': [
          { reps: 8, kilos: 70, completed: false },
          { reps: 8, kilos: 70, completed: false },
          { reps: 8, kilos: 70, completed: false },
        ],
        'Australian Pull-ups': [
          { reps: 12, kilos: 30, completed: false },
          { reps: 12, kilos: 30, completed: false },
          { reps: 12, kilos: 30, completed: false },
        ],
        Bíceps: [
          { reps: 15, kilos: 15, completed: false },
          { reps: 15, kilos: 15, completed: false },
          { reps: 15, kilos: 15, completed: false },
        ],
        'Push-ups': [
          { reps: 10, kilos: 70, completed: false },
          { reps: 10, kilos: 70, completed: false },
          { reps: 10, kilos: 70, completed: false },
        ],
        Shoulders: [
          { reps: 12, kilos: 7.5, completed: false },
          { reps: 12, kilos: 7.5, completed: false },
          { reps: 12, kilos: 7.5, completed: false },
        ],
      },
      lower: {
        Squats: [
          { reps: 10, kilos: 70, completed: false },
          { reps: 8, kilos: 70, completed: false },
          { reps: 5, kilos: 70, completed: false },
        ],
        Extensor: [
          { reps: 10, kilos: 35, completed: false },
          { reps: 10, kilos: 35, completed: false },
          { reps: 10, kilos: 35, completed: false },
        ],
        Flexor: [
          { reps: 10, kilos: 30, completed: false },
          { reps: 10, kilos: 30, completed: false },
          { reps: 10, kilos: 30, completed: false },
        ],
        Calves: [
          { reps: 12, kilos: 100, completed: false },
          { reps: 12, kilos: 100, completed: false },
          { reps: 12, kilos: 100, completed: false },
        ],
        Abs: [
          { reps: 10, completed: false },
          { reps: 10, completed: false },
          { reps: 10, completed: false },
        ],
      },
    };
    return meta.map((m) => {
      const sets =
        (defaults[workoutType] && defaults[workoutType][m.name]) || [];
      return { ...m, sets: sets.map((s) => ({ ...s })) };
    });
  };

  const getExercisesWithSaved = (workoutType) => {
    const defaults = getDefaultExercises(workoutType);
    const saved = loadWorkoutData(workoutType);
    if (!saved || !Array.isArray(saved.exercises)) return defaults;
    const savedByName = Object.fromEntries(
      saved.exercises.filter((ex) => ex && ex.name).map((ex) => [ex.name, ex]),
    );
    return defaults.map((ex) => {
      const s = savedByName[ex.name];
      return { ...ex, sets: s && Array.isArray(s.sets) ? s.sets : ex.sets };
    });
  };

  const useWorkoutSession = (workoutType) => {
    const exercises = ref(getExercisesWithSaved(workoutType));
    const hasSavedData = computed(() => hasWorkoutData(workoutType));

    onMounted(() => {
      exercises.value = getExercisesWithSaved(workoutType);
    });

    watch(
      exercises,
      (newExercises) => {
        saveWorkoutData(workoutType, newExercises);
      },
      { deep: true },
    );

    const completedSets = computed(() => {
      return exercises.value.reduce((total, exercise) => {
        return total + exercise.sets.filter((set) => set.completed).length;
      }, 0);
    });

    const totalSets = computed(() => {
      return exercises.value.reduce((total, exercise) => {
        return total + exercise.sets.length;
      }, 0);
    });

    const progressPercentage = computed(() => {
      return totalSets.value > 0
        ? Math.round((completedSets.value / totalSets.value) * 100)
        : 0;
    });

    const resetWorkout = () => {
      exercises.value.forEach((exercise) => {
        exercise.sets.forEach((set) => {
          set.completed = false;
        });
      });
    };

    const saveProgress = () => {
      return saveWorkoutData(workoutType, exercises.value);
    };

    return {
      exercises,
      hasSavedData,
      completedSets,
      totalSets,
      progressPercentage,
      resetWorkout,
      saveProgress,
    };
  };

  // Save workout data to localStorage
  const saveWorkoutData = (workoutType, exercises) => {
    if (process.client) {
      // simplify to only dynamic set fields
      const simplifiedExercises = exercises.map((exercise, idx) => ({
        name: exercise.name || `exercise_${idx}`,
        sets: exercise.sets.map((set) => ({
          reps: set.reps,
          kilos: set.kilos,
          completed: !!set.completed,
        })),
      }));

      // load previous data to keep max record across sessions
      let prev = null;
      try {
        prev = JSON.parse(localStorage.getItem(`workout_${workoutType}`));
      } catch (e) {
        prev = null;
      }
      const prevVolumeByName = (prev && prev.recordsVolume) || {};

      // compute highest total volume (sum of kilos*reps of completed sets) per exercise
      const recordsVolume = {};
      simplifiedExercises.forEach((exercise, idx) => {
        const name = exercise.name || `exercise_${idx}`;
        const sets = Array.isArray(exercise.sets) ? exercise.sets : [];
        const sessionVolume = sets.reduce((sum, s) => {
          const reps = Number(s.reps);
          const kilos = Number(s.kilos);
          if (
            !s.completed ||
            !Number.isFinite(reps) ||
            !Number.isFinite(kilos)
          ) {
            return sum;
          }
          return sum + reps * kilos;
        }, 0);

        const prevRecord = prevVolumeByName[name];
        const prevVolume =
          prevRecord && Array.isArray(prevRecord.sets)
            ? prevRecord.sets.reduce((sum, s) => {
                const reps = Number(s.reps);
                const kilos = Number(s.kilos);
                if (
                  !s.completed ||
                  !Number.isFinite(reps) ||
                  !Number.isFinite(kilos)
                ) {
                  return sum;
                }
                return sum + reps * kilos;
              }, 0)
            : -1;

        if (sessionVolume >= prevVolume) {
          // Save the complete sets for the record session in the same format as exercises
          recordsVolume[name] = { name, sets };
        } else if (prevRecord) {
          recordsVolume[name] = prevRecord;
        }
      });

      const data = {
        exercises: simplifiedExercises,
        lastUpdated: new Date().toISOString(),
        completedSets: exercises.reduce((total, exercise) => {
          return total + exercise.sets.filter((set) => set.completed).length;
        }, 0),
        totalSets: exercises.reduce((total, exercise) => {
          return total + exercise.sets.length;
        }, 0),
        recordsVolume,
      };
      localStorage.setItem(`workout_${workoutType}`, JSON.stringify(data));
      return true;
    }
    return false;
  };

  // Get workout history
  const getWorkoutHistory = () => {
    if (process.client) {
      const history = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('workout_')) {
          const workoutType = key.replace('workout_', '');
          try {
            history[workoutType] = JSON.parse(localStorage.getItem(key));
          } catch (e) {
            console.error('Error parsing workout data:', e);
          }
        }
      }
      return history;
    }
    return {};
  };

  // Clear all workout data
  const clearAllWorkoutData = () => {
    if (process.client) {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('workout_')) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key));
      return true;
    }
    return false;
  };

  // Get workout statistics
  const getWorkoutStats = () => {
    const history = getWorkoutHistory();
    const stats = {
      totalWorkouts: Object.keys(history).length,
      lastWorkout: null,
      totalCompletedSets: 0,
      totalSets: 0,
    };

    Object.values(history).forEach((workout) => {
      if (workout.lastUpdated) {
        if (
          !stats.lastWorkout ||
          new Date(workout.lastUpdated) > new Date(stats.lastWorkout)
        ) {
          stats.lastWorkout = workout.lastUpdated;
        }
      }
      stats.totalCompletedSets += workout.completedSets || 0;
      stats.totalSets += workout.totalSets || 0;
    });

    return stats;
  };

  return {
    loadWorkoutData,
    hasWorkoutData,
    saveWorkoutData,
    getWorkoutHistory,
    clearAllWorkoutData,
    getWorkoutStats,
    getDefaultExercisesMeta,
    getDefaultExercises,
    getExercisesWithSaved,
    useWorkoutSession,
  };
};
