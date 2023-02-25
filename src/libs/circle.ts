
const degToRad = (deg: number) => (deg * Math.PI) / 180;

export const positionOnCircle = (radius: number, angle: number) => {
    const angleInRad = degToRad(angle);

    return ({
        x: radius * Math.cos(angleInRad),
        y: radius * Math.sin(angleInRad),
    });
}