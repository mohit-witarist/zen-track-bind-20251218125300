import { create } from 'zustand';

const useStore = create((set) => ({
  speed: 0.5,
  weather: 'sunny', // 'sunny', 'rain', 'snow', 'fog', 'storm'
  scene: 'countryside', // 'countryside', 'mountains', 'coastal', 'city', 'forest'
  time: 12, // 0-24
  isPaused: false,
  cameraZoom: 1,

  setSpeed: (speed) => set({ speed }),
  setWeather: (weather) => set({ weather }),
  setScene: (scene) => set({ scene }),
  setTime: (time) => set({ time }),
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  setCameraZoom: (zoom) => set({ cameraZoom: zoom }),
}));

export default useStore;
