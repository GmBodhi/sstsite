import { useEffect } from 'react';

export default function TextMorpher() {
    useEffect(() => {
        const elts = {
            text1: document.getElementById('text1'),
            text2: document.getElementById('text2'),
        };
        const texts = ['സർഗ്ഗം', 'ചിത്രം', 'താളം'];
        const morphTime = 1.78;
        const cooldownTime = 0.25;
        let textIndex = texts.length - 1;
        let time = new Date();
        let morph = 0;
        let cooldown = cooldownTime;
        elts.text1.textContent = texts[textIndex % texts.length];
        elts.text2.textContent = texts[(textIndex + 1) % texts.length];
        function doMorph() {
            morph -= cooldown;
            cooldown = 0;
            let fraction = morph / morphTime;
            if (fraction > 1) {
                cooldown = cooldownTime;
                fraction = 1;
            }
            setMorph(fraction);
        }
        function setMorph(fraction) {
            // fraction = Math.cos(fraction * Math.PI) / -2 + .5;
            elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
            elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
            fraction = 1 - fraction;
            elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
            elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
            elts.text1.textContent = texts[textIndex % texts.length];
            elts.text2.textContent = texts[(textIndex + 1) % texts.length];
        }
        function doCooldown() {
            morph = 0;
            elts.text2.style.filter = '';
            elts.text2.style.opacity = '100%';
            elts.text1.style.filter = '';
            elts.text1.style.opacity = '0%';
        }
        function animate() {
            requestAnimationFrame(animate);
            let newTime = new Date();
            let shouldIncrementIndex = cooldown > 0;
            let dt = (newTime - time) / 1000;
            time = newTime;
            cooldown -= dt;
            if (cooldown <= 0) {
                if (shouldIncrementIndex) {
                    textIndex++;
                }
                doMorph();
            } else {
                doCooldown();
            }
        }
        animate();
    }, []);
    return (
        <>
            <div className="flex flex-col justify-center items-center mx-auto top-0 bottom-0 text-white filter [filter:url(#threshold)_blur(0.6px)]">
                <span id="text1" className="absolute w-full inline-block font-['Raleway'] text-[80px] font-extrabold text-center select-none"></span>
                <span id="text2" className="absolute w-full inline-block font-['Raleway'] text-[80px] font-extrabold text-center select-none"></span>
            </div>
            <svg id="filters">
                <defs>
                    <filter id="threshold">
                        <feColorMatrix
                            in="SourceGraphic"
                            type="matrix"
                            values="1 0 0 0 0
        0 1 0 0 0
        0 0 1 0 0
        0 0 0 255 -140"
                        />
                    </filter>
                </defs>
            </svg>
        </>
    );
}
