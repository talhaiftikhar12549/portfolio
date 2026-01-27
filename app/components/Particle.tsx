"use client";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import { type Container, type ISourceOptions } from "@tsparticles/engine";

const ParticlesComponent = (props: { id?: string }) => {

    const [init, setInit] = useState(false);
    // this should be run only once per application lifetime
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
            // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
            // starting from v2 you can add only the features you need reducing the bundle size
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container) => {
        console.log(container);
    };


    const options: ISourceOptions = useMemo(
        () => ({
            background: {
                color: {
                    value: "#0e0e1a",
                },
            },
            fullScreen: {
                enable: false,
                zIndex: -1,

            },
            style: {
                position: "absolute" as const,
                width: "100%",
                height: "100%",
                top: 0,
                left: 0
            },
            fpsLimit: 120, // Lowering to 120 or 60 is better for performance usually, default 240 is high
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "repulse",
                    },
                    onHover: {
                        enable: true,
                        mode: 'grab',
                    },
                },
                modes: {
                    push: {
                        distance: 100,
                        duration: 15,
                    },
                    grab: {
                        distance: 150,
                    },
                },
            },
            particles: {
                color: {
                    value: "#324052",
                },
                links: {
                    color: "#324052",
                    distance: 150,
                    enable: true,
                    opacity: 0.3,
                    width: 1,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: true,
                    speed: 4,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 150,
                },
                opacity: {
                    value: 0.1,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 5, max: 10 },
                },
            },
            detectRetina: true,
        }),
        [],
    );


    if (init) {
        return <Particles id={props.id} particlesLoaded={particlesLoaded} options={options} />;
    }

    return <></>;
};

export default ParticlesComponent;
