export const levelToXp = (level) => {
  let xp = 0

  for (let i = 1; i < level; i++) {
    xp += Math.floor(i + 300 * Math.pow(2, i / 7))
  }

  return Math.floor(xp / 4)
}

export const xpToLevel = (xp) => {
  let level = 1

  while (levelToXp(level) < xp) {
    level++
  }

  return level
}

export const XP_PER_SECOND = 0.36206752777
