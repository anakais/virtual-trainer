export const useWorkout = () => {
  // Load saved workout data from localStorage
  const loadWorkoutData = (workoutType) => {
    if (process.client) {
      const saved = localStorage.getItem(`workout_${workoutType}`)
      return saved ? JSON.parse(saved) : null
    }
    return null
  }

  // Check if there's saved data for a workout type
  const hasWorkoutData = (workoutType) => {
    if (process.client) {
      return localStorage.getItem(`workout_${workoutType}`) !== null
    }
    return false
  }

  // Save workout data to localStorage
  const saveWorkoutData = (workoutType, exercises) => {
    if (process.client) {
      const data = {
        exercises,
        lastUpdated: new Date().toISOString(),
        completedSets: exercises.reduce((total, exercise) => {
          return total + exercise.sets.filter(set => set.completed).length
        }, 0),
        totalSets: exercises.reduce((total, exercise) => {
          return total + exercise.sets.length
        }, 0)
      }
      localStorage.setItem(`workout_${workoutType}`, JSON.stringify(data))
      return true
    }
    return false
  }

  // Get workout history
  const getWorkoutHistory = () => {
    if (process.client) {
      const history = {}
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key.startsWith('workout_')) {
          const workoutType = key.replace('workout_', '')
          try {
            history[workoutType] = JSON.parse(localStorage.getItem(key))
          } catch (e) {
            console.error('Error parsing workout data:', e)
          }
        }
      }
      return history
    }
    return {}
  }

  // Clear all workout data
  const clearAllWorkoutData = () => {
    if (process.client) {
      const keysToRemove = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key.startsWith('workout_')) {
          keysToRemove.push(key)
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key))
      return true
    }
    return false
  }

  // Get workout statistics
  const getWorkoutStats = () => {
    const history = getWorkoutHistory()
    const stats = {
      totalWorkouts: Object.keys(history).length,
      lastWorkout: null,
      totalCompletedSets: 0,
      totalSets: 0
    }

    Object.values(history).forEach(workout => {
      if (workout.lastUpdated) {
        if (!stats.lastWorkout || new Date(workout.lastUpdated) > new Date(stats.lastWorkout)) {
          stats.lastWorkout = workout.lastUpdated
        }
      }
      stats.totalCompletedSets += workout.completedSets || 0
      stats.totalSets += workout.totalSets || 0
    })

    return stats
  }

  return {
    loadWorkoutData,
    hasWorkoutData,
    saveWorkoutData,
    getWorkoutHistory,
    clearAllWorkoutData,
    getWorkoutStats
  }
} 