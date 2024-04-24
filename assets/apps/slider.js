const rainbowSliders = document.querySelectorAll('.accs');

rainbowSliders.forEach(rainbowSlider => {
    rainbowSlider.addEventListener('input', () => {
        const hue = rainbowSlider.value;
        const rgbColor = hslToRgb(hue / 360, 1, 0.5);
        cv('accent', rgbColor);
    });

    rainbowSlider.addEventListener('change', async () => {
        const hue = rainbowSlider.value;
        const rgbColor = hslToRgb(hue / 360, 1, 0.5);
        console.log(`<i> (${rgbColor})`)
        await writef('/user/info/accent', `${rgbColor}`);
    });
});

function hslToRgb(h, s, l) {
    let r, g, b;

    if (s == 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
