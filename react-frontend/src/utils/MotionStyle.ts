export interface AnimationStyle {
    whileHover: any;
    animate: any;
    transition: any;  
  }

/**
 * 
 * @param rarity card's rarity
 * return animations for card displaying
 */
export function generateStyleFromRarity(rarity: number): AnimationStyle {
    if (rarity < 5) {
      return {
        whileHover: '',
        animate: '',
        transition: ''
      } 
    } else if (rarity < 10) {
      return {
        whileHover: {
          y: -10,
          boxShadow: "0px 0px 40px rgba(255, 200, 100, 0.8)"
        },
        animate: {
          boxShadow: [
            "0px 0px 20px rgba(255, 200, 100, 0.4)", 
            "0px 0px 35px rgba(255, 180, 80, 0.6)", 
            "0px 0px 20px rgba(255, 200, 100, 0.4)"
          ]
        },
        transition: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }
      }
    } else if (rarity < 15) {
      return {
        whileHover: '',
        animate: '',
        transition: ''
      }
    } else {
      return {
        whileHover: '',
        animate: '',
        transition: ''
      }
    }
}

export function generateStyleFromRarityForSummon(rarity: number): AnimationStyle {
    if (rarity < 5) {
        return {
          whileHover: '',
          animate: '',
          transition: ''
        } 
      } else if (rarity < 10) {
        return {
          whileHover: {
            y: -10,
            boxShadow: "0px 0px 60px rgba(255, 215, 100, 1)", // Bright flash on hover
          },
          animate: {
            boxShadow: [
                "0px 0px 30px rgba(255, 215, 100, 0.5)", // Soft glow
                "0px 0px 80px rgba(255, 215, 50, 0.9)", // Super bright expansion
                "0px 0px 30px rgba(255, 215, 100, 0.5)", // Back to soft glow
            ]
          },
          transition: {
            duration: 1.5, // Faster pulsing
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }
        }
      } else if (rarity < 15) {
        return {
          whileHover: '',
          animate: '',
          transition: ''
        }
      } else {
        return {
          whileHover: '',
          animate: '',
          transition: ''
        }
      }
}