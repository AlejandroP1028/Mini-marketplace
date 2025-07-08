import { gsap } from "gsap"

export const fadeInUp = (element: HTMLElement, delay = 0) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay,
      ease: "power2.out",
    },
  )
}

export const scaleIn = (element: HTMLElement, delay = 0) => {
  gsap.fromTo(
    element,
    {
      scale: 0.8,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      delay,
      ease: "back.out(1.7)",
    },
  )
}

export const slideInLeft = (element: HTMLElement, delay = 0) => {
  gsap.fromTo(
    element,
    {
      x: -50,
      opacity: 0,
    },
    {
      x: 0,
      opacity: 1,
      duration: 0.6,
      delay,
      ease: "power2.out",
    },
  )
}

export const staggerChildren = (container: HTMLElement, childSelector: string) => {
  const children = container.querySelectorAll(childSelector)
  gsap.fromTo(
    children,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
    },
  )
}
