"use client";

import { useEffect } from 'react';
import { useAnimate } from 'motion/react';
import styles from './Cursor.module.scss';

export const Cursor = () => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      animate(scope.current, { x: clientX, y: clientY }, { duration: 0 });
    };

    const onMouseOut = (event: MouseEvent) => {
      if (!event.relatedTarget) {
        animate(scope.current, { opacity: 0, scale: 0.5 }, { duration: 0.1 });
      }
    };

    const onMouseOver = (event: MouseEvent) => {
      if (!event.relatedTarget) {
        animate(scope.current, { opacity: 1, scale: 1 }, { duration: 0.1 });
      }
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('a') || target.closest('button')) {
        animate(scope.current, { scale: 4 }, { duration: 0.2 });
      }
    };

    const onPointerOut = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('a') || target.closest('button')) {
        animate(scope.current, { scale: 1 }, { duration: 0.2 });
      }
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('a')) {
        animate(scope.current, {
          scale: 1,
        }, { duration: 0.2 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseout', onMouseOut);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('pointerover', onPointerOver);
    document.addEventListener('pointerout', onPointerOut);
    document.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseout', onMouseOut);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerout', onPointerOut);
      document.removeEventListener('click', onClick);
    };
  }, [animate, scope]);
  
  return (
    <div ref={scope} id='custom-cursor' className={styles["Cursor"]} style={{ opacity: 0, scale: 1, transform: 'translate(-100px, -100px)' }}>
      <span className={styles["Cursor__text"]}>View</span>
    </div>
  );
};