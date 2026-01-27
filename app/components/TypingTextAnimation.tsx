"use client";
import { TypeAnimation } from 'react-type-animation';

export default function TypingTextAnimation() {
    return (
        <TypeAnimation
            sequence={[
                // Same substring at the start will only be typed out once, initially
                'A passionate Software Engineer',
                2000,
                'A passionate Freelancer',
                2000,
                'A passionate Mern Stack Engineer',
                2000,
                'A passionate SEO Content Writer',
                2000
            ]}
            wrapper="span"
            speed={50}
            style={{ display: 'inline-block' }}
            repeat={Infinity}
        />
    )
}
