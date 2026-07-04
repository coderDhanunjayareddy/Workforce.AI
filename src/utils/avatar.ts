export const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export const getAvatarGradient = (seed: string) => {
  const gradients = [
    "linear-gradient(135deg, #0F1B3D, #0D9488)",
    "linear-gradient(135deg, #152754, #3B82F6)",
    "linear-gradient(135deg, #0F766E, #10B981)",
    "linear-gradient(135deg, #334155, #60A5FA)"
  ];
  return gradients[seed.length % gradients.length];
};
