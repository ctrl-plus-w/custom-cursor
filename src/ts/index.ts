const cursor = document.getElementById('cursor');

const px = (val: number): string => {
  return val + 'px';
};

// The cursor size
const SIZE = 45;
const COLOR = 'black';

// Mouse position
let mx = window.innerWidth / 2;
let my = window.innerHeight / 2;
let mouseInDocument = true;

// Cursor position
let cx = 0;
let cy = 0;

// Update the cursor size
cursor.style.width = px(SIZE);
cursor.style.height = px(SIZE);

cursor.style.background = COLOR;

const lerp = (start: number, end: number, t: number): number => {
  return start * (1 - t) + end * t;
};

const onMouseMove = (e: MouseEvent): void => {
  mx = e.clientX;
  my = e.clientY;
};

const onMouseLeave = (_e: MouseEvent): void => {
  mouseInDocument = false;
};

const onMouseEnter = (_e: MouseEvent): void => {
  mouseInDocument = true;
};

const render = (): void => {
  if (mx === -1 || my === -1 || !mouseInDocument) {
    cursor.style.opacity = '0%';
  } else {
    cursor.style.opacity = '100%';
  }

  cx = lerp(cx, mx, 0.2);
  cy = lerp(cy, my, 0.2);

  cursor.style.transform = `translate3d(calc(-50% + ${cx}px), calc(-50% + ${cy}px), 0px)`;

  window.requestAnimationFrame(render);
};

window.addEventListener('mousemove', onMouseMove);

document.documentElement.addEventListener('mouseenter', onMouseEnter);
document.documentElement.addEventListener('mouseleave', onMouseLeave);

window.requestAnimationFrame(render);
