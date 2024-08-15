// This exists because react-native was having a winge about uuidv4

export function useUniqueId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}
