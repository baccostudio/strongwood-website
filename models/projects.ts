import { ProjectDataInterface } from "@/types/ProjectsTypes"

export const projectsCategories: string[] = [
    "all", "kitchen", "closet", "bathroom", "desk", "warehouse",
    "office-and-industry", "rack", "bedroom", "others", "products"
]

export const projectsData: ProjectDataInterface = {
    aboutData: {
        projectSlug: "about-data",
        title: "",
        subtitle: "",
        image: {
            "imgSrc": "/assets/img/aboutPage/Strong-58.webp",
            "imgAlt": "banner image",
            "objPosition": "30% 50%"
        },
        details: {
            secondTwoSmallImg: [
                {
                    imgSrc: "/assets/img/aboutPage/Strong-10.webp",
                    imgAlt: "Home Image",
                    objPosition: "50% 50%"
                },
                {
                    imgSrc: "/assets/img/aboutPage/Strong-105.webp",
                    imgAlt: "Home Image",
                    objPosition: "50% 50%"
                }
            ],
            technicalInfo: {
                image: {
                    imgSrc: "/assets/img/aboutPage/Strong-1.webp",
                    imgAlt: "Home Image",
                    objPosition: "45% 50%"
                },
                title: "Buscamos que el habitar sea una cálida experiencia.",
                description: [
                    "Somos una empresa familiar apasionada por el diseño y la fabricación de muebles excepcionales.",
                    "Nos especializamos en diseñar y fabricar cada producto a medida para todo tipo de proyectos, ya sea para hogares, obras, oficinas o locales comerciales.",
                    "Nos encargamos de cada paso del proceso, desde la conceptualización hasta la instalación final."
                ],
                homeFooterData: {
                    proyects: {
                        title: "Ver proyectos",
                        url: "/projects"
                    }
                }
            },
            secondTechnicalInfo: {
                image: {
                    imgSrc: "/assets/img/aboutPage/Strong-23.webp",
                    imgAlt: "Home Image",
                    objPosition: "50% 50%"
                },
                title: "Tenés un proyecto en mente? Vamos a darle vida juntos!",
                description: [
                    "Creemos que los muebles no solo deben ser meramente funcionales, sino que también deben representar una expresión de la belleza y personalidad de quienes los aprecian.",
                    "Por lo que desde hace generacion, hemos entregado a nuestros clientes la calidad y el cuidado en cada pieza que creamos. "
                ],
                homeFooterData: {
                    contact: {
                        title: "Contactanos",
                        url: "/contact"
                    }
                }
            }
        },
        year: "",
        location: "",
        categories: ["all"],
        urlSlug: "all"
    },
    "cocina-vison": {
        projectSlug: "cocina-vison",
        title: "Refacción cocina",
        subtitle: "Serie Vison",
        image: {
            imgSrc: "/assets/img/projectsPage/kitchen/vison/IMG_8090.webp",
            imgAlt: "Cocina",
            objPosition: "70% 50%"
        },
        year: "2023",
        location: "Buenos Aires, Argentina",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/kitchen/vison/IMG_8090.webp",
                imgAlt: "Cocina",
                objPosition: "50% 100%"
            },
            twoSmallImg: [
                {
                    imgSrc: "/assets/img/projectsPage/kitchen/vison/IMG_8102.webp",
                    imgAlt: "Cocina",
                    objPosition: "0% 50%"
                },
                {
                    imgSrc: "/assets/img/projectsPage/kitchen/vison/IMG_8103.webp",
                    imgAlt: "Cocina",
                    objPosition: "100% 100%"
                }
            ],
            thirdTwoSmallImg: [
                {
                    imgSrc: "/assets/img/projectsPage/kitchen/vison/IMG_8094.webp",
                    imgAlt: "Cocina",
                    objPosition: "0% 50%"
                },
                {
                    imgSrc: "/assets/img/projectsPage/kitchen/vison/IMG_8086.webp",
                    imgAlt: "Cocina",
                    objPosition: "100% 100%"
                }
            ],
            technicalInfo: {
                image: {
                    imgSrc: "/assets/img/projectsPage/kitchen/vison/IMG_8099.webp",
                    imgAlt: "Cocina",
                    objPosition: "100% 50%"
                },
                title: "Cocina - Serie Vison",
                description: [
                    "Una gama sorprendente que aporta nuevas posibilidades y opciones de diseño.",
                ],
                footer: {
                    materials: ["Melamina sahara - ", "Melamina laca - ", "Luces led - ", "Accesorios"],
                    propousal: ["Refacción cocina"],
                    year: ["2023"],
                    location: ["Buenos Aires, ", " Argentina"],
                }
            }
        },
        categories: ["all", "kitchen"],
        urlSlug: "kitchen"
    },
    "cocina-nova": {
        projectSlug: "cocina-nova",
        title: "Refacción cocina",
        subtitle: "Serie Nova",
        image: {
            imgSrc: "/assets/img/projectsPage/kitchen/nova/Strong-cocina-003.webp",
            imgAlt: "Cocina",
            objPosition: "0% 50%"
        },
        year: "2023",
        location: "Buenos Aires, Argentina",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/kitchen/nova/Strong-cocina-003.webp",
                imgAlt: "Cocina",
                objPosition: "50% 50%"
            },
            twoSmallImg: [
                {
                    imgSrc: "/assets/img/projectsPage/kitchen/nova/STRONG-28.webp",
                    imgAlt: "Cocina",
                    objPosition: "35% 0%"
                },
                {
                    imgSrc: "/assets/img/projectsPage/kitchen/nova/STRONG-11.webp",
                    imgAlt: "Cocina",
                    objPosition: "50% 0%"
                }
            ],
            rectangleImg: {
                imgSrc: "/assets/img/projectsPage/kitchen/nova/STRONG-08.webp",
                imgAlt: "Cocina",
                objPosition: "50% 60%"
            },
            technicalInfo: {
                image: {
                    imgSrc: "/assets/img/projectsPage/kitchen/nova/STRONG-27.webp",
                    imgAlt: "Cocina",
                    objPosition: "50% 0%"
                },
                title: "Cocina - Serie Nova",
                description: [
                    "Refacción de una cocina en forma de L de un departamento antiguo, con barra desayunadora revestida en a listonado de eucalipto laqueado.",
                ],
                footer: {
                    materials: ["MDF - ", "DEFONDANDO - ", "LAQUEADO blanco"],
                    propousal: ["Refacción cocina"],
                    year: ["2023"],
                    location: ["Buenos Aires, ", " Argentina"],
                }
            }
        },
        categories: ["all", "kitchen"],
        urlSlug: "kitchen"
    },
    "cocina-new-york": {
        projectSlug: "cocina-new-york",
        title: "Cocina",
        subtitle: "Serie New York",
        image: {
            imgSrc: "/assets/img/projectsPage/kitchen/newYork/Strong-142.webp",
            imgAlt: "Cocina",
            objPosition: "50% 25%"
        },
        year: "2023",
        location: "Buenos Aires, Argentina",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/kitchen/newYork/Strong-142.webp",
                imgAlt: "Cocina",
                objPosition: "20% 40%"
            },
            twoSmallImg: [
                {
                    imgSrc: "/assets/img/projectsPage/kitchen/newYork/Strong-149.webp",
                    imgAlt: "Cocina",
                    objPosition: "55% 50%",
                },
                {
                    imgSrc: "/assets/img/projectsPage/kitchen/newYork/Strong-140.webp",
                    imgAlt: "Cocina",
                    objPosition: "25% 35%",
                }
            ],
            rectangleImg: {
                imgSrc: "/assets/img/projectsPage/kitchen/newYork/Strong-146.webp",
                imgAlt: "Cocina",
                objPosition: "30% 40%",
            },
            technicalInfo: {
                image: {
                    imgSrc: "/assets/img/projectsPage/kitchen/newYork/Strong-156.webp",
                    imgAlt: "Cocina",
                    objPosition: "10% 50%",
                },
                title: "Cocina - Serie New York",
                description: [
                    "Refacción de una cocina simple en forma lineal con detalles actuales con una impronta relajada y sobria.",
                ],
                footer: {
                    materials: ["Melamina gratito y scotch - ", "Simil madera"],
                    propousal: ["Obra nueva"],
                    year: ["2023"],
                    location: ["Buenos Aires, ", " Argentina"],
                }
            }
        },
        categories: ["all", "kitchen"],
        urlSlug: "kitchen"
    },
    "cocina-premium": {
        projectSlug: "cocina-premium",
        title: "Refacción cocina",
        subtitle: "Serie Premium",
        image: {
            imgSrc: "/assets/img/projectsPage/kitchen/premium/Strong-266.webp",
            imgAlt: "Cocina",
            objPosition: "50% 50%"
        },
        year: "2023",
        location: "Buenos Aires, Argentina",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/kitchen/premium/Strong-266.webp",
                imgAlt: "Cocina",
                objPosition: "50% 55%"
            },
            twoSmallImg: [
                {
                    imgSrc: "/assets/img/projectsPage/kitchen/premium/Strong-270.webp",
                    imgAlt: "Cocina",
                    objPosition: "45% 0%",
                },
                {
                    imgSrc: "/assets/img/projectsPage/kitchen/premium/Strong-275.webp",
                    imgAlt: "Cocina",
                    objPosition: "25% 35%",
                }
            ],
            rectangleImg: {
                imgSrc: "/assets/img/projectsPage/kitchen/premium/Strong-284.webp",
                imgAlt: "Cocina",
                objPosition: "60% 40%",
            },
            technicalInfo: {
                image: {
                    imgSrc: "/assets/img/projectsPage/kitchen/premium/Strong-272.webp",
                    imgAlt: "Cocina",
                    objPosition: "70% 0%",
                },
                title: "Cocina - Serie Premium",
                description: [
                    "Obra de vivienda nueva en melamina color laqueada en forma de U con isla.",
                    "Se incorporaron accesorios de tendencias actuales que aportan diseño en el espacio."
                ],
                footer: {
                    materials: ["Melamina gris grafito laqueada semi mate - ", "Accesorios de cocina - ", "Herrajes premium"],
                    propousal: ["Refacción cocina"],
                    year: ["2023"],
                    location: ["Buenos Aires, ", " Argentina"],
                }
            }
        },
        categories: ["all", "kitchen"],
        urlSlug: "kitchen"
    },
    "cocina-escandinavo": {
        projectSlug: "cocina-escandinavo",
        title: "Cocina",
        subtitle: "Serie Nordica",
        image: {
            imgSrc: "/assets/img/projectsPage/kitchen/escandinavo/IMG_7685.webp",
            imgAlt: "Cocina",
            objPosition: "50% 55%"
        },
        year: "2023",
        location: "Buenos Aires, Argentina",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/kitchen/escandinavo/IMG_7685.webp",
                imgAlt: "Cocina",
                objPosition: "85% 60%"
            },
            twoSmallImg: [
                {
                    imgSrc: "/assets/img/projectsPage/kitchen/escandinavo/IMG_9303.webp",
                    imgAlt: "Cocina",
                    objPosition: "50% 0%"
                },
                {
                    imgSrc: "/assets/img/projectsPage/kitchen/escandinavo/IMG_9287.webp",
                    imgAlt: "Cocina",
                    objPosition: "60% 50%"
                }
            ],
            technicalInfo: {
                image: {
                    imgSrc: "/assets/img/projectsPage/kitchen/escandinavo/IMG_9289.webp",
                    imgAlt: "Cocina",
                    objPosition: "40% 0%"
                },
                title: "Cocina - Serie Escandinavo",
                description: [
                    "Elegancia y simpleza en el diseño y materiales.",
                ],
                footer: {
                    materials: ["Perfect Sense blanco brillante - ", "Accesorios",],
                    propousal: ["Obra nueva"],
                    year: ["2023"],
                    location: ["Buenos Aires, ", " Argentina"],
                }
            }
        },
        categories: ["all", "kitchen"],
        urlSlug: "kitchen"
    },
    "cocina-nordica": {
        projectSlug: "cocina-nordica",
        title: "Refacción cocina",
        subtitle: "Serie Nordica",
        image: {
            imgSrc: "/assets/img/projectsPage/kitchen/nordica/Strong-208.webp",
            imgAlt: "Cocina",
            objPosition: "50% 55%"
        },
        year: "2023",
        location: "Buenos Aires, Argentina",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/kitchen/nordica/Strong-208.webp",
                imgAlt: "Cocina",
                objPosition: "50% 80%"
            },
            twoSmallImg: [
                {
                    imgSrc: "/assets/img/projectsPage/kitchen/nordica/Strong-215.webp",
                    imgAlt: "Cocina",
                    objPosition: "85% 0%"
                },
                {
                    imgSrc: "/assets/img/projectsPage/kitchen/nordica/Strong-234.webp",
                    imgAlt: "Cocina",
                    objPosition: "60% 0%"
                }
            ],
            rectangleImg: {
                imgSrc: "/assets/img/projectsPage/kitchen/nordica/Strong-239.webp",
                imgAlt: "Cocina",
                objPosition: "50% 55%"
            },
            technicalInfo: {
                image: {
                    imgSrc: "/assets/img/projectsPage/kitchen/nordica/Strong-225.webp",
                    imgAlt: "Cocina",
                    objPosition: "40% 0%"
                },
                title: "Cocina - Serie Nordica",
                description: [
                    "Refacción de departamento diseñada por el Arq.Helou.",
                    "Inspirada en tonalidades de la naturaleza, transmitiendo una sensación serena y simple en los espacios."
                ],
                footer: {
                    materials: ["Melamina blanca - ", "Alistonado de eucaliptus laqueado",],
                    propousal: ["Refacción cocina"],
                    year: ["2023"],
                    location: ["Buenos Aires, ", " Argentina"],
                }
            }
        },
        categories: ["all", "kitchen"],
        urlSlug: "kitchen"
    },
    "vajillero-new-york": {
        projectSlug: "vajillero-new-york",
        title: "Vajillero",
        subtitle: "Serie New York",
        image: {
            imgSrc: "/assets/img/projectsPage/others/vajilleroNewYork/Strong-136.webp",
            imgAlt: "Vajillero",
            objPosition: "50% 100%"
        },
        year: "2023",
        location: "Buenos Aires, Argentina",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/others/vajilleroNewYork/Strong-136.webp",
                imgAlt: "Vajillero",
                objPosition: "50% 100%"
            },
            twoSmallImg: [
                {
                    imgSrc: "/assets/img/projectsPage/others/vajilleroNewYork/Strong-132.webp",
                    imgAlt: "Vajillero",
                    objPosition: "85% 0%",
                },
                {
                    imgSrc: "/assets/img/projectsPage/others/vajilleroNewYork/Strong-134.webp",
                    imgAlt: "Vajillero",
                    objPosition: "50% 50%",
                }
            ],
            rectangleImg: {
                imgSrc: "/assets/img/projectsPage/others/vajilleroNewYork/Strong-139.webp",
                imgAlt: "Vajillero",
                objPosition: "50% 35%",
            },
            technicalInfo: {
                image: {
                    imgSrc: "/assets/img/projectsPage/others/vajilleroNewYork/Strong-133.webp",
                    imgAlt: "Vajillero",
                    objPosition: "70% 0%",
                },
                title: "Vajillero - Serie New York",
                description: [
                    "Vajillero de color potenciando su atractivo y personalidad en el ambiente."
                ],
                footer: {
                    materials: ["Melamina colo laqueada - ", "Luces Led - ", "Accesorios de armado - ", "Herrajes premium"],
                    propousal: ["Obra nueva"],
                    year: ["2023"],
                    location: ["Buenos Aires, ", " Argentina"],
                }
            }
        },
        categories: ["all", "others"],
        urlSlug: "others"
    },
    "farina-e-pane": {
        projectSlug: "farina-e-pane",
        title: "Equipamiento local",
        subtitle: "Farina e Pane",
        image: {
            imgSrc: "/assets/img/projectsPage/office-and-industry/farinaPane/Strong-162.webp",
            imgAlt: "Farina e Pane",
            objPosition: "0% 50%"
        },
        year: "2023",
        location: "Buenos Aires, Argentina",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/office-and-industry/farinaPane/Strong-162.webp",
                imgAlt: "Farina e Pane",
                objPosition: "25% 100%"
            },
            twoSmallImg: [
                {
                    imgSrc: "/assets/img/projectsPage/office-and-industry/farinaPane/Strong-170.webp",
                    imgAlt: "Farina e Pane",
                    objPosition: "30% 0%"
                },
                {
                    imgSrc: "/assets/img/projectsPage/office-and-industry/farinaPane/Strong-177.webp",
                    imgAlt: "Farina e Pane",
                    objPosition: "85% 50%",
                }
            ],
            thirdTwoSmallImg: [
                {
                    imgSrc: "/assets/img/projectsPage/office-and-industry/farinaPane/Strong-178.webp",
                    imgAlt: "Farina e Pane",
                    objPosition: "50% 50%"
                },
                {
                    imgSrc: "/assets/img/projectsPage/office-and-industry/farinaPane/Strong-187.webp",
                    imgAlt: "Farina e Pane",
                    objPosition: "50% 0%"
                }
            ],
            rectangleImg: {
                imgSrc: "/assets/img/projectsPage/office-and-industry/farinaPane/Strong-167.webp",
                imgAlt: "Farina e Pane",
                objPosition: "50% 60%",
            },
            secondRectangleImg: {
                imgSrc: "/assets/img/projectsPage/office-and-industry/farinaPane/Strong-182.webp",
                imgAlt: "Farina e Pane",
                objPosition: "0% 100%",
            },
            thirdRectangleImg: {
                imgSrc: "/assets/img/projectsPage/office-and-industry/farinaPane/Strong-183.webp",
                imgAlt: "Farina e Pane",
                objPosition: "0% 15%"
            },
            technicalInfo: {
                image: {
                    imgSrc: "/assets/img/projectsPage/office-and-industry/farinaPane/Strong-165.webp",
                    imgAlt: "Farina e Pane",
                    objPosition: "15% 0%"
                },
                title: "Equipamiento Farina e Pane",
                description: [
                    "Equipamiento completo de pasteleria gastronomica artesanal."
                ],
                footer: {
                    materials: ["Melamina simil madera - ", "Melamina laca - ", "Caño de hierro"],
                    propousal: ["Equipamiento local"],
                    year: ["2023"],
                    location: ["Buenos Aires, ", " Argentina"],
                }
            }
        },
        categories: ["all", "office-and-industry"],
        urlSlug: "office-and-industry"
    },
    "timo-online": {
        projectSlug: "timo-online",
        title: "Equipamiento oficina",
        subtitle: "Timo Online",
        image: {
            imgSrc: "/assets/img/projectsPage/office-and-industry/timoEscritorio/Strong-timo3.webp",
            imgAlt: "Timo Online",
            objPosition: "50% 80%"
        },
        year: "2023",
        location: "Buenos Aires, Argentina",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/office-and-industry/timoEscritorio/Strong-timo3.webp",
                imgAlt: "Timo Online",
                objPosition: "60% 80%"
            },
            rectangleImg: {
                imgSrc: "/assets/img/projectsPage/office-and-industry/timoEscritorio/Strong-timo1.webp",
                imgAlt: "Timo Online",
                objPosition: "50% 45%"
            },
            technicalInfo: {
                image: {
                    imgSrc: "/assets/img/projectsPage/office-and-industry/timoEscritorio/Strong-timo4.webp",
                    imgAlt: "Timo Online",
                    objPosition: "50% 25%"
                },
                title: "Equipamiento Timo Online",
                description: [
                    "Equipamiento completo de oficina."
                ],
                footer: {
                    materials: ["Melamina hickory natural - ", "Caño estructural - ", "Puerta de vidrio - "],
                    propousal: ["Equipamiento oficina"],
                    year: ["2023"],
                    location: ["Buenos Aires, ", " Argentina"],
                }
            }
        },
        categories: ["all", "office-and-industry"],
        urlSlug: "office-and-industry"
    },
    "recibidor-london": {
        projectSlug: "recibidor-london",
        title: "Recibidor",
        subtitle: "Serie London",
        image: {
            imgSrc: "/assets/img/projectsPage/others/recibidorLondon/Strong-247.webp",
            imgAlt: "Recibidor",
            objPosition: "80% 40%"
        },
        year: "2023",
        location: "Buenos Aires, Argentina",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/others/recibidorLondon/Strong-247.webp",
                imgAlt: "Recibidor",
                objPosition: "55% 100%"
            },
            twoSmallImg: [
                {
                    imgSrc: "/assets/img/projectsPage/others/recibidorLondon/Strong-245.webp",
                    imgAlt: "Recibidor",
                    objPosition: "10% 0%",
                },
                {
                    imgSrc: "/assets/img/projectsPage/others/recibidorLondon/Strong-246.webp",
                    imgAlt: "Recibidor",
                    objPosition: "45% 50%",
                }
            ],
            rectangleImg: {
                imgSrc: "/assets/img/projectsPage/others/recibidorLondon/Strong-250.webp",
                imgAlt: "Recibidor",
                objPosition: "0% 50%",
            },
            technicalInfo: {
                image: {
                    imgSrc: "/assets/img/projectsPage/others/recibidorLondon/Strong-252.webp",
                    imgAlt: "Recibidor",
                    objPosition: "80% 0%",
                },
                title: "Recibidor - Serie London",
                description: [
                    "Recibidor inspirado en la naturaleza como en las tendencias evolucionistas, modernizando y expandiendo las gamas disponibles."
                ],
                footer: {
                    materials: ["Melamina color - ", "Melamina simil madera"],
                    propousal: ["Obra nueva"],
                    year: ["2023"],
                    location: ["Buenos Aires, ", " Argentina"],
                }
            }
        },
        categories: ["all", "others"],
        urlSlug: "others"
    },
    "rack-tv-london": {
        projectSlug: "rack-tv-london",
        title: "Rack TV",
        subtitle: "Serie London",
        image: {
            imgSrc: "/assets/img/projectsPage/rack/rackTvLondon/Strong-265.webp",
            imgAlt: "Rack TV",
            objPosition: "30% 80%"
        },
        year: "2023",
        location: "Buenos Aires, Argentina",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/rack/rackTvLondon/Strong-265.webp",
                imgAlt: "Rack TV",
                objPosition: "30% 50%"
            },
            twoSmallImg: [
                {
                    imgSrc: "/assets/img/projectsPage/rack/rackTvLondon/Strong-257.webp",
                    imgAlt: "Rack TV",
                    objPosition: "50% 50%",
                },
                {
                    imgSrc: "/assets/img/projectsPage/rack/rackTvLondon/IMG_2774.webp",
                    imgAlt: "Rack TV",
                    objPosition: "0% 50%",
                }
            ],
            rectangleImg: {
                imgSrc: "/assets/img/projectsPage/rack/rackTvLondon/Strong-255.webp",
                imgAlt: "Rack TV",
                objPosition: "30% 100%",
            },
            technicalInfo: {
                image: {
                    imgSrc: "/assets/img/projectsPage/rack/rackTvLondon/Strong-259.webp",
                    imgAlt: "Rack TV",
                    objPosition: "10% 50%",
                },
                title: "Rack TV - Serie London",
                description: [
                    "Rack de lineas simples y clasicas que suavizan el espacio."
                ],
                footer: {
                    materials: ["Melamina laca - ", "Melamina scotch"],
                    propousal: ["Obra nueva"],
                    year: ["2023"],
                    location: ["Buenos Aires, ", " Argentina"],
                }
            }
        },
        categories: ["all", "rack"],
        urlSlug: "rack"
    },
    "bodega-napoleon": {
        projectSlug: "bodega-napoleon",
        title: "Bodega",
        subtitle: "Serie Napoleon",
        image: {
            imgSrc: "/assets/img/projectsPage/warehouse/bodega/IMG_8511.webp",
            imgAlt: "Bodega",
            objPosition: "50% 50%"
        },
        year: "2023",
        location: "Buenos Aires, Argentina",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/warehouse/bodega/IMG_8511.webp",
                imgAlt: "Bodega",
                objPosition: "50% 60%"
            },
            twoSmallImg: [
                {
                    imgSrc: "/assets/img/projectsPage/warehouse/bodega/IMG_8517.webp",
                    imgAlt: "Bodega",
                    objPosition: "70% 0%"
                },
                {
                    imgSrc: "/assets/img/projectsPage/warehouse/bodega/IMG_8507.webp",
                    imgAlt: "Bodega",
                    objPosition: "80% 100%"
                }
            ],
            technicalInfo: {
                image: {
                    imgSrc: "/assets/img/projectsPage/warehouse/bodega/IMG_8508.webp",
                    imgAlt: "Bodega",
                    objPosition: "50% 0%"
                },
                title: "Bodega - Serie Napoleon",
                description: [
                    "Bodega diseñada para resaltar la elegancia de los vinos, creando una experiencia visual cautivadora y atrayente."
                ],
                footer: {
                    materials: ["Puertas de vidrio - ", "melamina - ", "luces led"],
                    propousal: ["Obra nueva"],
                    year: ["2024"],
                    location: ["Buenos Aires, ", " Argentina"],
                }
            }
        },
        categories: ["all", "warehouse"],
        urlSlug: "warehouse"
    },
    "vanitory-nordico": {
        projectSlug: "vanitory-nordico",
        title: "Vanitory",
        subtitle: "Serie Nordico",
        image: {
            imgSrc: "/assets/img/projectsPage/bathroom/nordico/Strong-241.webp",
            imgAlt: "Vanitory",
            objPosition: "50% 50%"
        },
        year: "2023",
        location: "Buenos Aires, Argentina",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/bathroom/nordico/Strong-241.webp",
                imgAlt: "Vanitory",
                objPosition: "50% 60%"
            },
            twoSmallImg: [
                {
                    imgSrc: "/assets/img/projectsPage/bathroom/nordico/Strong-115.webp",
                    imgAlt: "Vanitory",
                    objPosition: "70% 0%"
                },
                {
                    imgSrc: "/assets/img/projectsPage/bathroom/nordico/Strong-242.webp",
                    imgAlt: "Vanitory",
                    objPosition: "80% 100%"
                }
            ],
            technicalInfo: {
                image: {
                    imgSrc: "/assets/img/projectsPage/bathroom/nordico/Strong-117.webp",
                    imgAlt: "Vanitory",
                    objPosition: "50% 0%"
                },
                title: "Vanitory - Serie Nordico",
                description: [
                    "La madera es la materia prima que caracteriza el mobiliario desde siempre, por su textura, perfume y calidez."
                ],
                footer: {
                    materials: ["Alistonado de eucaliptus laqueado semi mate"],
                    propousal: ["Remodelación toilette"],
                    year: ["2023"],
                    location: ["Buenos Aires, ", " Argentina"],
                }
            }
        },
        categories: ["all", "bathroom"],
        urlSlug: "bathroom"
    },
    "vanitory-premium": {
        projectSlug: "vanitory-premium",
        title: "Vanitory",
        subtitle: "Serie Premium",
        image: {
            imgSrc: "/assets/img/projectsPage/bathroom/premium/IMG_7755.webp",
            imgAlt: "Vanitory",
            objPosition: "50% 50%"
        },
        year: "2023",
        location: "Buenos Aires, Argentina",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/bathroom/premium/IMG_7755.webp",
                imgAlt: "Vanitory",
                objPosition: "50% 60%"
            },
            rectangleImg: {
                imgSrc: "/assets/img/projectsPage/bathroom/premium/IMG_7753.webp",
                imgAlt: "Noviembre cafe",
                objPosition: "50% 50%"
            },
            technicalInfo: {
                image: {
                    imgSrc: "/assets/img/projectsPage/bathroom/premium/IMG_7751.webp",
                    imgAlt: "Vanitory",
                    objPosition: "50% 0%"
                },
                title: "Vanitory - Serie Premium",
                description: [
                    "La madera es la materia prima que caracteriza el mobiliario desde siempre, por su textura, perfume y calidez.",
                    "Diseño por la Arq. Magui Pueyo."
                ],
                footer: {
                    materials: ["guatambú laqueado"],
                    propousal: ["Obra nueva"],
                    year: ["2023"],
                    location: ["Buenos Aires, ", " Argentina"],
                }
            }
        },
        categories: ["all", "bathroom"],
        urlSlug: "bathroom"
    },
    "noviembre-cafe": {
        projectSlug: "noviembre-cafe",
        title: "Equipamiento local",
        subtitle: "Noviembre cafe",
        image: {
            imgSrc: "/assets/img/projectsPage/office-and-industry/noviembreCafe/IMG_7048.webp",
            imgAlt: "Noviembre cafe",
            objPosition: "50% 63%"
        },
        year: "2023",
        location: "Buenos Aires, Argentina",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/office-and-industry/noviembreCafe/IMG_7048.webp",
                imgAlt: "Noviembre cafe",
                objPosition: "0% 60%"
            },
            rectangleImg: {
                imgSrc: "/assets/img/projectsPage/office-and-industry/noviembreCafe/IMG_7049.webp",
                imgAlt: "Noviembre cafe",
                objPosition: "50% 20%"
            },
            technicalInfo: {
                image: {
                    imgSrc: "/assets/img/projectsPage/office-and-industry/noviembreCafe/IMG_7051.webp",
                    imgAlt: "Noviembre Cafe",
                    objPosition: "50% 50%"
                },
                title: "Recepción Noviembre cafe",
                description: [
                    "Equipamiento completo de cafeteria."
                ],
                footer: {
                    materials: ["Melamina color - ", "Madera de paraiso laqueada"],
                    propousal: ["Equipamiento local"],
                    year: ["2023"],
                    location: ["Buenos Aires, ", " Argentina"],
                }
            }
        },
        categories: ["all", "office-and-industry"],
        urlSlug: "office-and-industry"
    },
    "gorila-fitness": {
        projectSlug: "gorila-fitness",
        title: "Recepción",
        subtitle: "Gorilla Fitness",
        image: {
            imgSrc: "/assets/img/projectsPage/office-and-industry/gorilaRecepcion/Strong-gorila1.webp",
            imgAlt: "Gorilla Fitness",
            objPosition: "50% 80%"
        },
        year: "2023",
        location: "Buenos Aires, Argentina",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/office-and-industry/gorilaRecepcion/Strong-gorila1.webp",
                imgAlt: "Gorilla Fitness",
                objPosition: "50% 60%"
            },
            rectangleImg: {
                imgSrc: "/assets/img/projectsPage/office-and-industry/gorilaRecepcion/Strong-gorila3.webp",
                imgAlt: "Gorilla Fitness",
                objPosition: "50% 55%"
            },
            technicalInfo: {
                image: {
                    imgSrc: "/assets/img/projectsPage/office-and-industry/gorilaRecepcion/Strong-gorila2.webp",
                    imgAlt: "Gorilla Fitness",
                    objPosition: "50% 25%"
                },
                title: "Recepción Gorilla Fitness",
                description: [
                    "Recibidor para gimnasio buscando acompañar el diseño del lugar."
                ],
                footer: {
                    materials: ["Petiriby - ", "Madera maciza laqueada - ", "Hierro estructural"],
                    propousal: ["Recibidor local"],
                    year: ["2023"],
                    location: ["Buenos Aires, ", " Argentina"],
                }
            }
        },
        categories: ["all", "office-and-industry"],
        urlSlug: "office-and-industry"
    },
    "vanitory-new-york": {
        projectSlug: "vanitory-new-york",
        title: "Vanitory",
        subtitle: "Serie New York",
        image: {
            imgSrc: "/assets/img/projectsPage/bathroom/newYork/Strong-300.webp",
            imgAlt: "Vanitory",
            objPosition: "45% 50%"
        },
        year: "2023",
        location: "Buenos Aires, Argentina",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/bathroom/newYork/Strong-300.webp",
                imgAlt: "Vanitory",
                objPosition: "45% 0%"
            },
            rectangleImg: {
                imgSrc: "/assets/img/projectsPage/bathroom/newYork/Strong-298.webp",
                imgAlt: "Vanitory",
                objPosition: "50% 50%"
            },
            secondRectangleImg: {
                imgSrc: "/assets/img/projectsPage/bathroom/newYork/Strong-299.webp",
                imgAlt: "Vanitory",
                objPosition: "50% 50%"
            },
            technicalInfo: {
                image: {
                    imgSrc: "/assets/img/projectsPage/bathroom/newYork/Strong-302.webp",
                    imgAlt: "Vanitory",
                    objPosition: "20% 0%"
                },
                title: "Vanitory - Serie New York",
                description: [
                    "Vanitory diseño industrial simple de lineas limpias."
                ],
                footer: {
                    materials: ["Madera de eucaliptus teñida"],
                    propousal: ["Obra nueva"],
                    year: ["2023"],
                    location: ["Buenos Aires, ", " Argentina"],
                }
            }
        },
        categories: ["all", "bathroom"],
        urlSlug: "bathroom"
    },
    "vanitory-escandinavo": {
        projectSlug: "vanitory-escandinavo",
        title: "Vanitory",
        subtitle: "Serie Escandinavo",
        image: {
            imgSrc: "/assets/img/projectsPage/bathroom/escandinavo/Strong-127.webp",
            imgAlt: "Vanitory",
            objPosition: "50% 15%"
        },
        year: "2023",
        location: "Buenos Aires, Argentina",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/bathroom/escandinavo/Strong-127.webp",
                imgAlt: "Vanitory",
                objPosition: "50% 35%"
            },
            rectangleImg:
            {
                imgSrc: "/assets/img/projectsPage/bathroom/escandinavo/Strong-125.webp",
                imgAlt: "Vanitory",
                objPosition: "50% 55%"
            },
            technicalInfo: {
                image: {
                    imgSrc: "/assets/img/projectsPage/bathroom/escandinavo/Strong-129.webp",
                    imgAlt: "Vanitory",
                    objPosition: "50% 0%"
                },
                title: "Vanitory - Serie Escandinavo",
                description: [
                    "Diseño elegante que aporta fusionalidad y comodidad en el ambiente."
                ],
                footer: {
                    materials: ["Madera de paraiso laqueada"],
                    propousal: ["Refacción vanitory"],
                    year: ["2023"],
                    location: ["Buenos Aires, ", " Argentina"],
                }
            }
        },
        categories: ["all", "bathroom"],
        urlSlug: "bathroom"
    },
    "vestidor-deluxe": {
        projectSlug: "vestidor-deluxe",
        title: "Vestidor",
        subtitle: "Serie Deluxe",
        image: {
            imgSrc: "/assets/img/projectsPage/closet/deluxe/Strong_7184.webp",
            imgAlt: "Vestidor",
            objPosition: "50% 90%"
        },
        year: "2023",
        location: "Buenos Aires, Argentina",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/closet/deluxe/Strong_7184.webp",
                imgAlt: "Vestidor",
                objPosition: "50% 100%"
            },
            twoSmallImg: [
                {
                    imgSrc: "/assets/img/projectsPage/closet/deluxe/Strong_7181.webp",
                    imgAlt: "Vestidor",
                    objPosition: "40% 100%"
                },
                {
                    imgSrc: "/assets/img/projectsPage/closet/deluxe/Strong_7185.webp",
                    imgAlt: "Vestidor",
                    objPosition: "50% 95%"
                }
            ],
            technicalInfo: {
                image: {
                    imgSrc: "/assets/img/projectsPage/closet/deluxe/Strong_7186.webp",
                    imgAlt: "Vestidor",
                    objPosition: "40% 90%"
                },
                title: "Vestidor - Serie Deluxe",
                description: [
                    "Refacción de vestidor buscando alivianar los espacios."
                ],
                footer: {
                    materials: ["Puertas de vidrio - ", "Melamina scotch - "],
                    propousal: ["Refacción vestidor"],
                    year: ["2023"],
                    location: ["Buenos Aires, ", " Argentina"],
                }
            }
        },
        categories: ["all", "closet"],
        urlSlug: "closet"
    },
    "vestidor-nordico": {
        projectSlug: "vestidor-nordico",
        title: "Vestidor",
        subtitle: "Serie Nordico",
        image: {
            imgSrc: "/assets/img/projectsPage/closet/nordico/Strong-291.webp",
            imgAlt: "Vestidor",
            objPosition: "0% 50%"
        },
        year: "2023",
        location: "Buenos Aires, Argentina",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/closet/nordico/Strong-291.webp",
                imgAlt: "Vestidor",
                objPosition: "40% 50%"
            },
            twoSmallImg: [
                {
                    imgSrc: "/assets/img/projectsPage/closet/nordico/Strong-295.webp",
                    imgAlt: "Vestidor",
                    objPosition: "80% 0%"
                },
                {
                    imgSrc: "/assets/img/projectsPage/closet/nordico/Strong-293.webp",
                    imgAlt: "Vestidor",
                    objPosition: "100% 100%"
                }
            ],
            technicalInfo: {
                image: {
                    imgSrc: "/assets/img/projectsPage/closet/nordico/Strong-296.webp",
                    imgAlt: "Vestidor",
                    objPosition: "50% 0%"
                },
                title: "Vestidor - Serie Nordico",
                description: [
                    "Vestidor en paralelo diseñado por el estudio Cciaro - Helou."
                ],
                footer: {
                    materials: ["Puertas de vidrio - ", "Luces Led - ", "Herrajes premium - ", "Melamina moscu y grafito"],
                    propousal: ["Obra nueva"],
                    year: ["2023"],
                    location: ["Buenos Aires, ", " Argentina"],
                }
            }
        },
        categories: ["all", "closet"],
        urlSlug: "closet"
    },
    "vestidor-premium": {
        projectSlug: "vestidor-premium",
        title: "Vestidor",
        subtitle: "Serie Premium",
        image: {
            imgSrc: "/assets/img/projectsPage/closet/premium/IMG_7902.webp",
            imgAlt: "Vestidor",
            objPosition: "50% 55%"
        },
        year: "2023",
        location: "Buenos Aires, Argentina",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/closet/premium/IMG_7902.webp",
                imgAlt: "Vestidor",
                objPosition: "85% 60%"
            },
            twoSmallImg: [
                {
                    imgSrc: "/assets/img/projectsPage/closet/premium/IMG_7350.webp",
                    imgAlt: "Vestidor",
                    objPosition: "60% 100%"
                },
                {
                    imgSrc: "/assets/img/projectsPage/closet/premium/IMG_7352.webp",
                    imgAlt: "Vestidor",
                    objPosition: "50% 100%"
                }
            ],
            thirdTwoSmallImg: [
                {
                    imgSrc: "/assets/img/projectsPage/closet/premium/IMG_7358.webp",
                    imgAlt: "Vestidor",
                    objPosition: "50% 100%"
                },
                {
                    imgSrc: "/assets/img/projectsPage/closet/premium/IMG_7906.webp",
                    imgAlt: "Vestidor",
                    objPosition: "50% 100%"
                }
            ],
            technicalInfo: {
                image: {
                    imgSrc: "/assets/img/projectsPage/closet/premium/IMG_7911.webp",
                    imgAlt: "Vestidor",
                    objPosition: "100% 100%"
                },
                title: "Vestidor - Serie Premium",
                description: [
                    "Vestidor con un toque de sofisticación inspirado en juegos de saturación y oxidos que amalgaman el espacio.",
                    "El detalle de las luces LED con sensor de movimiento en la apertura de las puertas."
                ],
                footer: {
                    materials: ["Puertas de vidrio - ", "Luces Led con sensor de mov. - ", "Melamina moscu y grafito"],
                    propousal: ["Obra nueva"],
                    year: ["2023"],
                    location: ["Buenos Aires, ", " Argentina"],
                }
            }
        },
        categories: ["all", "closet"],
        urlSlug: "closet"
    },
    "escritorio-nova": {
        projectSlug: "escritorio-nova",
        title: "Escritorio",
        subtitle: "Serie Nova",
        image: {
            imgSrc: "/assets/img/projectsPage/desk/escritorioNova/Strong-120.webp",
            imgAlt: "Escritorio",
            objPosition: "15% 100%"
        },
        year: "2023",
        location: "Buenos Aires, Argentina",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/desk/escritorioNova/Strong-120.webp",
                imgAlt: "Escritorio",
                objPosition: "15% 100%"
            },
            rectangleImg: {
                imgSrc: "/assets/img/projectsPage/desk/escritorioNova/Strong-118.webp",
                imgAlt: "Escritorio",
                objPosition: "15% 100%"
            },
            technicalInfo: {
                image: {
                    imgSrc: "/assets/img/projectsPage/desk/escritorioNova/Strong-123.webp",
                    imgAlt: "Escritorio",
                    objPosition: "50% 0%"
                },
                title: "Escritorio - Serie Nova",
                description: [
                    "Diseño con lineas simples dando un espacio liviano y relajado."
                ],
                footer: {
                    materials: ["Melamina laca"],
                    propousal: ["Obra nueva"],
                    year: ["2023"],
                    location: ["Buenos Aires, ", " Argentina"],
                }
            }
        },
        categories: ["all", "desk"],
        urlSlug: "desk"
    },
    "cama-matrimonial-nova": {
        projectSlug: "cama-matrimonial-nova",
        title: "Cama matrimonial",
        subtitle: "Serie Nova",
        image: {
            imgSrc: "/assets/img/projectsPage/bedroom/camaMatrimonialNova/IMG_6090.webp",
            imgAlt: "Cama matrimonial",
            objPosition: "50% 50%"
        },
        year: "2023",
        location: "Buenos Aires, Argentina",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/bedroom/camaMatrimonialNova/IMG_6090.webp",
                imgAlt: "Cama matrimonial",
                objPosition: "50% 50%"
            },
            twoSmallImg: [
                {
                    imgSrc: "/assets/img/projectsPage/bedroom/camaMatrimonialNova/IMG_6100.webp",
                    imgAlt: "Cama matrimonial",
                    objPosition: "90% 50%"
                },
                {
                    imgSrc: "/assets/img/projectsPage/bedroom/camaMatrimonialNova/IMG_6099.webp",
                    imgAlt: "Cama matrimonial",
                    objPosition: "50% 50%"
                }
            ],
            technicalInfo: {
                image: {
                    imgSrc: "/assets/img/projectsPage/bedroom/camaMatrimonialNova/IMG_6092.webp",
                    imgAlt: "Cama matrimonial",
                    objPosition: "50% 0%"
                },
                title: "Cama matrimonial - Serie Nova",
                description: [
                    "Cama matrimonial con baulera y 3 cajonera amplias con correderas reforzadas."
                ],
                footer: {
                    materials: ["Melamina ceniza - ", "MDF laqueado blanco"],
                    propousal: ["Obra nueva"],
                    year: ["2023"],
                    location: ["Buenos Aires, ", " Argentina"],
                }
            }
        },
        categories: ["all", "bedroom"],
        urlSlug: "bedroom"
    },
    "placar-urbanwood": {
        projectSlug: "placar-urbanwood",
        title: "Placar",
        subtitle: "Serie Urbanwood",
        image: {
            imgSrc: "/assets/img/projectsPage/closet/urbanwood/Strong-153.webp",
            imgAlt: "Placar",
            objPosition: "0% 40%"
        },
        year: "2023",
        location: "Buenos Aires, Argentina",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/closet/urbanwood/Strong-153.webp",
                imgAlt: "Placar",
                objPosition: "50% 90%"
            },
            technicalInfo: {
                image: {
                    imgSrc: "/assets/img/projectsPage/closet/urbanwood/Strong-152.webp",
                    imgAlt: "Placar",
                    objPosition: "30% 50%"
                },
                title: "Placar - Serie Urbanwood",
                description: [
                    "Vestidor en paralelo para departarmento nuevo teniendo en cuenta la pureza en el trazo y la simplicidad en el material."
                ],
                footer: {
                    materials: ["Melamina blanca con tiradores de aluminio"],
                    propousal: ["Obra nueva"],
                    year: ["2023"],
                    location: ["Buenos Aires, ", " Argentina"],
                }
            }
        },
        categories: ["all", "closet"],
        urlSlug: "closet"
    },
    // "estanteria-avila": {
    //     projectSlug: "estanteria-avila",
    //     title: "Estanteria Avila",
    //     subtitle: "Mueble industrial",
    //     image: {
    //         imgSrc: "/assets/img/projectsPage/products/estanteriaAvila/Strong_Wood_IG-80.webp",
    //         imgAlt: "Estanteria Avila",
    //         objPosition: "0% 65%"
    //     },
    //     year: "2022",
    //     location: "Mueble industrial",
    //     details: {
    //         portraitImg: {
    //             imgSrc: "/assets/img/projectsPage/products/estanteriaAvila/Strong_Wood_IG-80.webp",
    //             imgAlt: "Estanteria Avila",
    //             objPosition: "20% 65%"
    //         },
    //         twoSmallImg: [
    //             {
    //                 imgSrc: "/assets/img/projectsPage/products/estanteriaAvila/Strong_Wood_Set-22.webp",
    //                 imgAlt: "Estanteria Avila",
    //                 objPosition: "55% 50%"
    //             },
    //             {
    //                 imgSrc: "/assets/img/projectsPage/products/estanteriaAvila/Strong_Wood_IG-78.webp",
    //                 imgAlt: "Estanteria Avila",
    //                 objPosition: "60% 100%"
    //             }
    //         ],
    //         rectangleImg: {
    //             imgSrc: "/assets/img/projectsPage/products/estanteriaAvila/Strong_Wood_IG-81.webp",
    //             imgAlt: "Estanteria Avila",
    //             objPosition: "70% 100%"
    //         },
    //         technicalInfo: {
    //             image: {
    //                 imgSrc: "/assets/img/projectsPage/products/estanteriaAvila/Strong_Wood_IG-77.webp",
    //                 imgAlt: "Estanteria Avila",
    //                 objPosition: "0% 50%"
    //             },
    //             title: "Estanteria Avila",
    //             description: [
    //                 "Lanzamiento de colección de muebles industriales, que fusiona hierro y madera para lucir una expresión unica de rudeza y elegancia.",
    //                 "Cada pieza busca crear espacios auténticos y acogedores.",
    //             ],
    //             footer: {
    //                 materials: ["Madera, ", " Hierro, ", "Laca, ", "Goma protectora"],
    //                 propousal: ["Mueble industrial"],
    //                 year: ["2022"],
    //             }
    //         }
    //     },
    //     categories: ["products"],
    //     urlSlug: "products"
    // },
    "maceta-avinon": {
        projectSlug: "maceta-avinon",
        title: "Maceta Aviñon",
        subtitle: "Mueble industrial",
        image: {
            imgSrc: "/assets/img/projectsPage/products/macetaAvinon/Strong_Wood_IG-47.webp",
            imgAlt: "Maceta Aviñon",
            objPosition: "30% 100%"
        },
        year: "2022",
        location: "Mueble industrial",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/products/macetaAvinon/Strong_Wood_IG-47.webp",
                imgAlt: "Maceta Aviñon",
                objPosition: "35% 45%"
            },
            rectangleImg: {
                imgSrc: "/assets/img/projectsPage/products/macetaAvinon/Strong_Wood_IG-46.webp",
                imgAlt: "Maceta Aviñon",
                objPosition: "75% 72%"
            },
            technicalInfo: {
                price_ars: "$269.033",
                price_card: "$423.728",
                image: {
                    imgSrc: "/assets/img/projectsPage/products/macetaAvinon/Strong_Wood_IG-48.webp",
                    imgAlt: "Maceta Aviñon",
                    objPosition: "30% 0%"
                },
                title: "Maceta Aviñon",
                description: [
                    "Lanzamiento de colección de muebles industriales, que fusiona hierro y madera para lucir una expresión unica de rudeza y elegancia.",
                    "Cada pieza busca crear espacios auténticos y acogedores.",
                ],
                footer: {
                    materials: ["Madera, ", " Hierro, ", "Laca, ", "Goma protectora"],
                    propousal: ["Mueble industrial"],
                    year: ["2022"],
                }
            }
        },
        categories: ["products"],
        urlSlug: "products"
    },
    // "porta-vinos": {
    //     projectSlug: "porta-vinos",
    //     title: "Porta Vinos",
    //     subtitle: "Mueble industrial",
    //     image: {
    //         imgSrc: "/assets/img/projectsPage/products/portaVinos/Strong_Wood_IG-2.webp",
    //         imgAlt: "Porta Vinos",
    //         objPosition: "50% 100%"
    //     },
    //     year: "2022",
    //     location: "Mueble industrial",
    //     details: {
    //         portraitImg: {
    //             imgSrc: "/assets/img/projectsPage/products/portaVinos/Strong_Wood_IG-2.webp",
    //             imgAlt: "Porta Vinos",
    //             objPosition: "50% 100%"
    //         },
    //         twoSmallImg: [
    //             {
    //                 imgSrc: "/assets/img/projectsPage/products/portaVinos/Strong_Wood_IG-3.webp",
    //                 imgAlt: "Porta Vinos",
    //                 objPosition: "0% 100%"
    //             },
    //             {
    //                 imgSrc: "/assets/img/projectsPage/products/portaVinos/Strong_Wood_IG-1.webp",
    //                 imgAlt: "Porta Vinos",
    //                 objPosition: "50% 0%"
    //             }
    //         ],
    //         secondRectangleImg: {
    //             imgSrc: "/assets/img/projectsPage/products/portaVinos/Strong_Wood_IG-7.webp",
    //             imgAlt: "Porta Vinos",
    //             objPosition: "30% 100%"
    //         },
    //         technicalInfo: {
    //             image: {
    //                 imgSrc: "/assets/img/projectsPage/products/portaVinos/Strong_Wood_IG-6.webp",
    //                 imgAlt: "Porta Vinos",
    //                 objPosition: "40% 0%"
    //             },
    //             title: "Porta Vinos",
    //             description: [
    //                 "Lanzamiento de colección de muebles industriales, que fusiona hierro y madera para lucir una expresión unica de rudeza y elegancia.",
    //                 "Cada pieza busca crear espacios auténticos y acogedores.",
    //             ],
    //             footer: {
    //                 materials: ["Madera, ", " Hierro, ", "Laca"],
    //                 propousal: ["Mueble industrial"],
    //                 year: ["2022"],
    //             }
    //         }
    //     },
    //     categories: ["products"],
    //     urlSlug: "products"
    // },
    "estanteria-bath": {
        projectSlug: "estanteria-bath",
        title: "Estanteria Bath",
        subtitle: "Mueble industrial",
        image: {
            imgSrc: "/assets/img/projectsPage/products/estanteriaBath/Strong_Wood_IG-73.webp",
            imgAlt: "Estanteria Bath",
            objPosition: "70% 40%"
        },
        year: "2022",
        location: "Mueble industrial",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/products/estanteriaBath/Strong_Wood_IG-73.webp",
                imgAlt: "Estanteria Bath",
                objPosition: "65% 60%"
            },
            twoSmallImg: [
                {
                    imgSrc: "/assets/img/projectsPage/products/estanteriaBath/Strong_Wood_IG-72.webp",
                    imgAlt: "Estanteria Bath",
                    objPosition: "45% 50%"
                },
                {
                    imgSrc: "/assets/img/projectsPage/products/estanteriaBath/Strong_Wood_IG-71.webp",
                    imgAlt: "Estanteria Bath",
                    objPosition: "60% 60%"
                }
            ],
            technicalInfo: {
                price_ars: "$212.335",
                price_card: "$334.428",
                image: {
                    imgSrc: "/assets/img/projectsPage/products/estanteriaBath/Strong_Wood_IG-74.webp",
                    imgAlt: "Estanteria Bath",
                    objPosition: "70% 0%"
                },
                title: "Estanteria Bath",
                description: [
                    "Lanzamiento de colección de muebles industriales, que fusiona hierro y madera para lucir una expresión unica de rudeza y elegancia.",
                    "Cada pieza busca crear espacios auténticos y acogedores.",
                ],
                footer: {
                    materials: ["Madera, ", " Hierro, ", "Laca"],
                    propousal: ["Mueble industrial"],
                    year: ["2022"],
                }
            }
        },
        categories: ["products"],
        urlSlug: "products"
    },
    "mesa-cracovia": {
        projectSlug: "mesa-cracovia",
        title: "Mesa Cracovia",
        subtitle: "Mueble industrial",
        image: {
            imgSrc: "/assets/img/projectsPage/products/mesaCracovia/Strong_Wood_IG-102.webp",
            imgAlt: "Mesa Cracovia",
            objPosition: "50% 50%"
        },
        year: "2022",
        location: "Mueble industrial",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/products/mesaCracovia/Strong_Wood_IG-102.webp",
                imgAlt: "Mesa Cracovia",
                objPosition: "50% 40%"
            },
            rectangleImg: {
                imgSrc: "/assets/img/projectsPage/products/mesaCracovia/Strong_Wood_IG-101.webp",
                imgAlt: "Mesa Cracovia",
                objPosition: "0% 20%",
            },
            technicalInfo: {
                price_ars: "$1.245.974",
                price_card: "$1.962.409",
                image: {
                    imgSrc: "/assets/img/projectsPage/products/mesaCracovia/Strong_Wood_IG-103.webp",
                    imgAlt: "Mesa Cracovia",
                    objPosition: "0% 0%",
                },
                title: "Mesa Cracovia",
                description: [
                    "Lanzamiento de colección de muebles industriales, que fusiona hierro y madera para lucir una expresión unica de rudeza y elegancia.",
                    "Cada pieza busca crear espacios auténticos y acogedores.",
                ],
                footer: {
                    materials: ["Madera, ", " Hierro, ", "Laca, ", "Goma protectora"],
                    propousal: ["Mueble industrial"],
                    year: ["2022"],
                }
            }
        },
        categories: ["products"],
        urlSlug: "products"
    },
    "mesa-ratona-edimburgo": {
        projectSlug: "mesa-ratona-edimburgo",
        title: "Mesa ratona Edimburgo",
        subtitle: "Mueble industrial",
        image: {
            imgSrc: "/assets/img/projectsPage/products/mesaRatonaEdimburgo/Strong-Wood-Set-17.webp",
            imgAlt: "Mesa ratona Edimburgo",
            objPosition: "50% 50%",
        },
        year: "2022",
        location: "Mueble industrial",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/products/mesaRatonaEdimburgo/Strong-Wood-Set-17.webp",
                imgAlt: "Mesa ratona Edimburgo",
                objPosition: "50% 56%",
            },
            rectangleImg: {
                imgSrc: "/assets/img/projectsPage/products/mesaRatonaEdimburgo/Strong_Wood_IG-82.webp",
                imgAlt: "Mesa ratona Edimburgo",
                objPosition: "0% 50%",
            },
            technicalInfo: {
                price_ars: "$689.729",
                price_card: "$1.086.323",
                image: {
                    imgSrc: "/assets/img/projectsPage/products/mesaRatonaEdimburgo/Strong_Wood_IG-83.webp",
                    imgAlt: "Mesa ratona Edimburgo",
                    objPosition: "7% 50%",
                },
                title: "Mesa ratona Edimburgo",
                description: [
                    "Lanzamiento de colección de muebles industriales, que fusiona hierro y madera para lucir una expresión unica de rudeza y elegancia.",
                    "Cada pieza busca crear espacios auténticos y acogedores.",
                ],
                footer: {
                    materials: ["Madera, ", " Hierro, ", "Laca, ", "Goma protectora"],
                    propousal: ["Mueble industrial"],
                    year: ["2022"],
                }
            }
        },
        categories: ["products"],
        urlSlug: "products"
    },
    "maceta-sintra": {
        projectSlug: "maceta-sintra",
        title: "Maceta Sintra",
        subtitle: "Mueble industrial",
        image: {
            imgSrc: "/assets/img/projectsPage/products/macetaSintra/Strong_Wood_IG-43.webp",
            imgAlt: "Maceta Sintra",
            objPosition: "0% 65%",
        },
        year: "2022",
        location: "Mueble industrial",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/products/macetaSintra/Strong_Wood_IG-43.webp",
                imgAlt: "Maceta Sintra",
                objPosition: "7% 65%",
            },
            rectangleImg: {
                imgSrc: "/assets/img/projectsPage/products/macetaSintra/Strong_Wood_IG-44.webp",
                imgAlt: "Maceta Sintra",
                objPosition: "12% 55%"
            },
            technicalInfo: {
                price_ars: "$202.441",
                price_card: "$318.845",
                image: {
                    imgSrc: "/assets/img/projectsPage/products/macetaSintra/Strong_Wood_IG-40.webp",
                    imgAlt: "Maceta Sintra",
                    objPosition: "25% 0%"
                },
                title: "Maceta Sintra",
                description: [
                    "Lanzamiento de colección de muebles industriales, que fusiona hierro y madera para lucir una expresión unica de rudeza y elegancia.",
                    "Cada pieza busca crear espacios auténticos y acogedores.",
                ],
                footer: {
                    materials: ["Madera, ", " Hierro, ", "Laca, ", "Goma protectora"],
                    propousal: ["Mueble industrial"],
                    year: ["2022"],
                }
            }
        },
        categories: ["products"],
        urlSlug: "products"
    },
    "estanteria-siena": {
        projectSlug: "estanteria-siena",
        title: "Estanteria Siena",
        subtitle: "Mueble industrial",
        image: {
            imgSrc: "/assets/img/projectsPage/products/estanteriaSiena/Strong_Wood_IG-97.webp",
            imgAlt: "Estanteria Siena",
            objPosition: "50% 50%"
        },
        year: "2022",
        location: "Mueble industrial",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/products/estanteriaSiena/Strong_Wood_IG-97.webp",
                imgAlt: "Estanteria Siena",
                objPosition: "45% 20%"
            },
            rectangleImg: {
                imgSrc: "/assets/img/projectsPage/products/estanteriaSiena/Strong_Wood_IG-95.webp",
                imgAlt: "Estanteria Siena",
                objPosition: "45% 10%"
            },
            technicalInfo: {
                price_ars: "$298.202",
                price_card: "$469.668",
                image: {
                    imgSrc: "/assets/img/projectsPage/products/estanteriaSiena/Strong_Wood_IG-98.webp",
                    imgAlt: "Estanteria Siena",
                    objPosition: "40% 0%"
                },
                title: "Estanteria Siena",
                description: [
                    "Lanzamiento de colección de muebles industriales, que fusiona hierro y madera para lucir una expresión unica de rudeza y elegancia.",
                    "Cada pieza busca crear espacios auténticos y acogedores.",
                ],
                footer: {
                    materials: ["Madera, ", " Hierro, ", "Laca"],
                    propousal: ["Mueble industrial"],
                    year: ["2022"],
                }
            }
        },
        categories: ["products"],
        urlSlug: "products"
    },
    "llavero-corfu": {
        projectSlug: "llavero-corfu",
        title: "Llavero Corfu",
        subtitle: "Mueble industrial",
        image: {
            imgSrc: "/assets/img/projectsPage/products/llaveroCorfu/Strong_Wood_IG-20.webp",
            imgAlt: "Llavero Corfu",
            objPosition: "15% 70%"
        },
        year: "2022",
        location: "Mueble industrial",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/products/llaveroCorfu/Strong_Wood_IG-20.webp",
                imgAlt: "Llavero Corfu",
                objPosition: "25% 80%"
            },
            rectangleImg: {
                imgSrc: "/assets/img/projectsPage/products/llaveroCorfu/Strong_Wood_IG-23.webp",
                imgAlt: "Llavero Corfu",
                objPosition: "20% 60%"
            },
            technicalInfo: {
                price_ars: "$155.300",
                price_card: "$244.598",
                image: {
                    imgSrc: "/assets/img/projectsPage/products/llaveroCorfu/Strong_Wood_IG-21.webp",
                    imgAlt: "Llavero Corfu",
                    objPosition: "10% 40%"
                },
                title: "Llavero Corfu",
                description: [
                    "Lanzamiento de colección de muebles industriales, que fusiona hierro y madera para lucir una expresión unica de rudeza y elegancia.",
                    "Cada pieza busca crear espacios auténticos y acogedores.",
                ],
                footer: {
                    materials: ["Madera, ", " Hierro, ", "Laca"],
                    propousal: ["Mueble industrial"],
                    year: ["2022"],
                }
            }
        },
        categories: ["products"],
        urlSlug: "products"
    },
    // "leniero": {
    //     projectSlug: "leniero",
    //     title: "Leñero",
    //     subtitle: "Mueble industrial",
    //     image: {
    //         imgSrc: "/assets/img/projectsPage/products/leniero/Strong_Wood_IG-49.webp",
    //         imgAlt: "Leñero",
    //         objPosition: "0% 85%"
    //     },
    //     year: "2022",
    //     location: "Mueble industrial",
    //     details: {
    //         portraitImg: {
    //             imgSrc: "/assets/img/projectsPage/products/leniero/Strong_Wood_IG-49.webp",
    //             imgAlt: "Leñero",
    //             objPosition: "25% 87%"
    //         },
    //         technicalInfo: {
    //             image: {
    //                 imgSrc: "/assets/img/projectsPage/products/leniero/Strong_Wood_IG-50.webp",
    //                 imgAlt: "Leñero",
    //                 objPosition: "5% 100%"
    //             },
    //             title: "Leñero",
    //             description: [
    //                 "Lanzamiento de colección de muebles industriales, que fusiona hierro y madera para lucir una expresión unica de rudeza y elegancia.",
    //                 "Cada pieza busca crear espacios auténticos y acogedores.",
    //             ],
    //             footer: {
    //                 materials: ["Madera, ", " Hierro, ", "Laca, ", "Goma protectora"],
    //                 propousal: ["Mueble industrial"],
    //                 year: ["2022"],
    //             }
    //         }
    //     },
    //     categories: ["products"],
    //     urlSlug: "products"
    // },
    "rack-tv-cordoba": {
        projectSlug: "rack-tv-cordoba",
        title: "Rack TV Cordoba",
        subtitle: "Mueble industrial",
        image: {
            imgSrc: "/assets/img/projectsPage/products/rackTvCordoba/Strong_Wood_IG-66.webp",
            imgAlt: "Rack TV Cordoba",
            objPosition: "10% 100%"
        },
        year: "2022",
        location: "Mueble industrial",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/products/rackTvCordoba/Strong_Wood_IG-66.webp",
                imgAlt: "Rack TV Cordoba",
                objPosition: "15% 55%"
            },
            rectangleImg: {
                imgSrc: "/assets/img/projectsPage/products/rackTvCordoba/Strong_Wood_IG-69.webp",
                imgAlt: "Rack TV Cordoba",
                objPosition: "0% 85%"
            },
            technicalInfo: {
                price_ars: "$699.011",
                price_card: "$1.100.942",
                image: {
                    imgSrc: "/assets/img/projectsPage/products/rackTvCordoba/Strong_Wood_IG-67.webp",
                    imgAlt: "Rack TV Cordoba",
                    objPosition: "35% 0%"
                },
                title: "Rack TV Cordoba",
                description: [
                    "Lanzamiento de colección de muebles industriales, que fusiona hierro y madera para lucir una expresión unica de rudeza y elegancia.",
                    "Cada pieza busca crear espacios auténticos y acogedores.",
                ],
                footer: {
                    materials: ["Madera, ", " Hierro, ", "Laca, ", "Goma protectora"],
                    propousal: ["Mueble industrial"],
                    year: ["2022"],
                }
            }
        },
        categories: ["products"],
        urlSlug: "products"
    },
    "toallero-matera": {
        projectSlug: "toallero-matera",
        title: "Toallero Matera",
        subtitle: "Mueble industrial",
        image: {
            imgSrc: "/assets/img/projectsPage/products/toalleroMatera/Strong_Wood_IG-39.webp",
            imgAlt: "Toallero Matera",
            objPosition: "50% 80%"
        },
        year: "2022",
        location: "Mueble industrial",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/products/toalleroMatera/Strong_Wood_IG-39.webp",
                imgAlt: "Toallero Matera",
                objPosition: "50% 30%"
            },
            rectangleImg: {
                imgSrc: "/assets/img/projectsPage/products/toalleroMatera/Strong_Wood_IG-38.webp",
                imgAlt: "Toallero Matera",
                objPosition: "25% 20%"
            },
            technicalInfo: {
                price_ars: "$110.489",
                price_card: "$174.020",
                image: {
                    imgSrc: "/assets/img/projectsPage/products/toalleroMatera/Strong_Wood_IG-35.webp",
                    imgAlt: "Toallero Matera",
                    objPosition: "35% 20%"
                },
                title: "Toallero Matera",
                description: [
                    "Lanzamiento de colección de muebles industriales, que fusiona hierro y madera para lucir una expresión unica de rudeza y elegancia.",
                    "Cada pieza busca crear espacios auténticos y acogedores.",
                ],
                footer: {
                    materials: ["Madera, ", " Hierro, ", "Laca"],
                    propousal: ["Mueble industrial"],
                    year: ["2022"],
                }
            }
        },
        categories: ["products"],
        urlSlug: "products"
    },
    "toallero-cuenca": {
        projectSlug: "toallero-cuenca",
        title: "Toallero Cuenca",
        subtitle: "Mueble industrial",
        image: {
            imgSrc: "/assets/img/projectsPage/products/toalleroCuenca/Strong_Wood_IG-12.webp",
            imgAlt: "Toallero Cuenca",
            objPosition: "0% 0%"
        },
        year: "2022",
        location: "Mueble industrial",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/products/toalleroCuenca/Strong_Wood_IG-12.webp",
                imgAlt: "Toallero Cuenca",
                objPosition: "17% 50%"
            },
            twoSmallImg: [
                {
                    imgSrc: "/assets/img/projectsPage/products/toalleroCuenca/Strong_Wood_IG-8.webp",
                    imgAlt: "Toallero Cuenca",
                    objPosition: "15% 30%"
                },
                {
                    imgSrc: "/assets/img/projectsPage/products/toalleroCuenca/Strong_Wood_IG-14.webp",
                    imgAlt: "Toallero Cuenca",
                    objPosition: "15% 0%"
                }
            ],
            technicalInfo: {
                price_ars: "$128.667",
                price_card: "$202.651",
                image: {
                    imgSrc: "/assets/img/projectsPage/products/toalleroCuenca/Strong_Wood_IG-10.webp",
                    imgAlt: "Toallero Cuenca",
                    objPosition: "35% 0%"
                },
                title: "Toallero Cuenca",
                description: [
                    "Lanzamiento de colección de muebles industriales, que fusiona hierro y madera para lucir una expresión unica de rudeza y elegancia.",
                    "Cada pieza busca crear espacios auténticos y acogedores.",
                ],
                footer: {
                    materials: ["Madera, ", " Hierro, ", "Laca"],
                    propousal: ["Mueble industrial"],
                    year: ["2022"],
                }
            }
        },
        categories: ["products"],
        urlSlug: "products"
    },
    "bodega-segovia": {
        projectSlug: "bodega-segovia",
        title: "Bodega Segovia",
        subtitle: "Mueble industrial",
        image: {
            imgSrc: "/assets/img/projectsPage/products/bodegaSegovia/Strong_Wood_IG-57.webp",
            imgAlt: "Bodega Segovia",
            objPosition: "0% 70%"
        },
        year: "2022",
        location: "Mueble industrial",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/products/bodegaSegovia/Strong_Wood_IG-57.webp",
                imgAlt: "Bodega Segovia",
                objPosition: "15% 40%"
            },
            twoSmallImg: [
                {
                    imgSrc: "/assets/img/projectsPage/products/bodegaSegovia/Strong_Wood_IG-59.webp",
                    imgAlt: "Bodega Segovia",
                    objPosition: "45% 80%"
                },
                {
                    imgSrc: "/assets/img/projectsPage/products/bodegaSegovia/Strong_Wood_IG-58.webp",
                    imgAlt: "Bodega Segovia",
                    objPosition: "30% 70%"
                }
            ],
            technicalInfo: {
                price_ars: "$406.860",
                price_card: "$640.805",
                image: {
                    imgSrc: "/assets/img/projectsPage/products/bodegaSegovia/Strong_Wood_IG-61.webp",
                    imgAlt: "Bodega Segovia",
                    objPosition: "30% 70%"
                },
                title: "Bodega Segovia",
                description: [
                    "Lanzamiento de colección de muebles industriales, que fusiona hierro y madera para lucir una expresión unica de rudeza y elegancia.",
                    "Cada pieza busca crear espacios auténticos y acogedores.",
                ],
                footer: {
                    materials: ["Madera, ", " Hierro, ", "Laca, ", "Ruedas"],
                    propousal: ["Mueble industrial"],
                    year: ["2022"],
                }
            }
        },
        categories: ["products"],
        urlSlug: "products"
    },
    "mesa-de-luz-roma": {
        projectSlug: "mesa-de-luz-roma",
        title: "Mesa de luz Roma",
        subtitle: "Mueble industrial",
        image: {
            imgSrc: "/assets/img/projectsPage/products/mesaDeLuzRoma/Strong_Wood_IG-30.webp",
            imgAlt: "Mesa de luz Roma",
            objPosition: "30% 0%"
        },
        year: "2022",
        location: "Mueble industrial",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/products/mesaDeLuzRoma/Strong_Wood_IG-30.webp",
                imgAlt: "Mesa de luz Roma",
                objPosition: "30% 20%"
            },
            rectangleImg: {
                imgSrc: "/assets/img/projectsPage/products/mesaDeLuzRoma/Strong_Wood_IG-32.webp",
                imgAlt: "Mesa de luz Roma",
                objPosition: "50% 35%",
            },
            technicalInfo: {
                price_ars: "$410.281",
                price_card: "$646.193",
                image: {

                    imgSrc: "/assets/img/projectsPage/products/mesaDeLuzRoma/Strong_Wood_IG-28.webp",
                    imgAlt: "Mesa de luz Roma",
                    objPosition: "50% 15%",
                },
                title: "Mesa de luz Roma",
                description: [
                    "Lanzamiento de colección de muebles industriales, que fusiona hierro y madera para lucir una expresión unica de rudeza y elegancia.",
                    "Cada pieza busca crear espacios auténticos y acogedores.",
                ],
                footer: {
                    materials: ["Madera, ", " Hierro, ", "Laca, ", "Goma protectora"],
                    propousal: ["Mueble industrial"],
                    year: ["2022"],
                }
            }
        },
        categories: ["products"],
        urlSlug: "products"
    },
    "escritorio-brujas": {
        projectSlug: "escritorio-brujas",
        title: "Escritorio Brujas",
        subtitle: "Mueble industrial",
        image: {
            imgSrc: "/assets/img/projectsPage/products/escritorioBrujas/Strong_Wood_IG-90.webp",
            imgAlt: "Escritorio Brujas",
            objPosition: "50% 20%"
        },
        year: "2022",
        location: "Mueble industrial",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/products/escritorioBrujas/Strong_Wood_IG-90.webp",
                imgAlt: "Escritorio Brujas",
                objPosition: "50% 0%"
            },
            twoSmallImg: [
                {
                    imgSrc: "/assets/img/projectsPage/products/escritorioBrujas/Strong_Wood_IG-94.webp",
                    imgAlt: "Escritorio Brujas",
                    objPosition: "100% 20%",
                },
                {
                    imgSrc: "/assets/img/projectsPage/products/escritorioBrujas/Strong_Wood_IG-91.webp",
                    imgAlt: "Escritorio Brujas",
                    objPosition: "35% 0%",
                }
            ],
            technicalInfo: {
                price_ars: "$604.902",
                price_card: "$952.720",
                image: {
                    imgSrc: "/assets/img/projectsPage/products/escritorioBrujas/Strong_Wood_IG-92.webp",
                    imgAlt: "Escritorio Brujas",
                    objPosition: "50% 0%",
                },
                title: "Escritorio Brujas",
                description: [
                    "Lanzamiento de colección de muebles industriales, que fusiona hierro y madera para lucir una expresión unica de rudeza y elegancia.",
                    "Cada pieza busca crear espacios auténticos y acogedores.",
                ],
                footer: {
                    materials: ["Madera, ", " Hierro, ", "Laca, ", "Goma protectora"],
                    propousal: ["Mueble industrial"],
                    year: ["2022"],
                }
            }
        },
        categories: ["products"],
        urlSlug: "products"
    },
    "perchero-oporto": {
        projectSlug: "perchero-oporto",
        title: "Perchero Oporto",
        subtitle: "Mueble industrial",
        image: {
            imgSrc: "/assets/img/projectsPage/products/percheroOporto/Strong_Wood_IG-26.webp",
            imgAlt: "Perchero Oporto",
            objPosition: "60% 50%"
        },
        year: "2022",
        location: "Mueble industrial",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/products/percheroOporto/Strong_Wood_IG-26.webp",
                imgAlt: "Perchero Oporto",
                objPosition: "45% 25%"
            },
            rectangleImg: {
                imgSrc: "/assets/img/projectsPage/products/percheroOporto/Strong_Wood_IG-24.webp",
                imgAlt: "Perchero Oporto",
                objPosition: "55% 70%"
            },
            technicalInfo: {
                price_ars: "$147.543",
                price_card: "$232.381",
                image: {
                    imgSrc: "/assets/img/projectsPage/products/percheroOporto/Strong_Wood_IG-25.webp",
                    imgAlt: "Perchero Oporto",
                    objPosition: "10% 0%"
                },
                title: "Perchero Oporto",
                description: [
                    "Lanzamiento de colección de muebles industriales, que fusiona hierro y madera para lucir una expresión unica de rudeza y elegancia.",
                    "Cada pieza busca crear espacios auténticos y acogedores.",
                ],
                footer: {
                    materials: ["Madera, ", " Hierro, ", "Laca"],
                    propousal: ["Mueble industrial"],
                    year: ["2022"],
                }
            }
        },
        categories: ["products"],
        urlSlug: "products"
    },
    "recibidor-salamanca": {
        projectSlug: "recibidor-salamanca",
        title: "Recibidor Salamanca",
        subtitle: "Mueble industrial",
        image: {
            imgSrc: "/assets/img/projectsPage/products/recibidorSalamanca/Strong_Wood_IG-52.webp",
            imgAlt: "Recibidor Salamanca",
            objPosition: "40% 50%"
        },
        year: "2022",
        location: "Mueble industrial",
        details: {
            portraitImg: {
                imgSrc: "/assets/img/projectsPage/products/recibidorSalamanca/Strong_Wood_IG-52.webp",
                imgAlt: "Recibidor Salamanca",
                objPosition: "40% 45%"
            },
            twoSmallImg: [
                {
                    imgSrc: "/assets/img/projectsPage/products/recibidorSalamanca/Strong_Wood_IG-53.webp",
                    imgAlt: "Recibidor Salamanca",
                    objPosition: "35% 87%"
                },
                {
                    imgSrc: "/assets/img/projectsPage/products/recibidorSalamanca/Strong_Wood_IG-56.webp",
                    imgAlt: "Recibidor Salamanca",
                    objPosition: "20% 0%"
                }
            ],
            technicalInfo: {
                price_ars: "$460.326",
                price_card: "$725.014",
                image: {
                    imgSrc: "/assets/img/projectsPage/products/recibidorSalamanca/Strong_Wood_IG-55.webp",
                    imgAlt: "Recibidor Salamanca",
                    objPosition: "40% 0%"
                },
                title: "Recibidor Salamanca",
                description: [
                    "Lanzamiento de colección de muebles industriales, que fusiona hierro y madera para lucir una expresión unica de rudeza y elegancia.",
                    "Cada pieza busca crear espacios auténticos y acogedores.",
                ],
                footer: {
                    materials: ["Madera, ", " Hierro, ", "Laca, ", "Goma protectora"],
                    propousal: ["Mueble industrial"],
                    year: ["2022"],
                }
            }
        },
        categories: ["products"],
        urlSlug: "products"
    },
    // "tabla-asado": {
    //     projectSlug: "tabla-asado",
    //     title: "Tabla Asado",
    //     subtitle: "Mueble industrial",
    //     image: {
    //         imgSrc: "/assets/img/projectsPage/products/tablaAsado/Strongwood_Tabla_parri-4.webp",
    //         imgAlt: "Tabla Asado",
    //         objPosition: "80% 50%"
    //     },
    //     year: "2022",
    //     location: "Mueble industrial",
    //     details: {
    //         portraitImg: {
    //             imgSrc: "/assets/img/projectsPage/products/tablaAsado/Strongwood_Tabla_parri-4.webp",
    //             imgAlt: "Tabla Asado",
    //             objPosition: "80% 85%"
    //         },
    //         rectangleImg: {
    //             imgSrc: "/assets/img/projectsPage/products/tablaAsado/Strongwood_Tabla_parri-7.webp",
    //             imgAlt: "Tabla Asado",
    //             objPosition: "40% 80%"
    //         },
    //         technicalInfo: {
    //             image: {
    //                 imgSrc: "/assets/img/projectsPage/products/tablaAsado/Strongwood_Tabla_parri-10.webp",
    //                 imgAlt: "Tabla Asado",
    //                 objPosition: "60% 0%"
    //             },
    //             title: "Tabla Asado",
    //             description: [
    //                 "Lanzamiento de colección de muebles industriales, que fusiona hierro y madera para lucir una expresión unica de rudeza y elegancia.",
    //                 "Cada pieza busca crear espacios auténticos y acogedores.",
    //             ],
    //             footer: {
    //                 materials: ["Madera, ", "Laca"],
    //                 propousal: ["Mueble industrial"],
    //                 year: ["2022"],
    //             }
    //         }
    //     },
    //     categories: ["products"],
    //     urlSlug: "products"
    // },
    // "soporte-auricular": {
    //     projectSlug: "soporte-auricular",
    //     title: "Soporte Auricular",
    //     subtitle: "Mueble industrial",
    //     image: {
    //         imgSrc: "/assets/img/projectsPage/products/soporteAuricular/Strong_Wood_IG-93.webp",
    //         imgAlt: "Soporte Auricular",
    //         objPosition: "90% 0%"
    //     },
    //     year: "2022",
    //     location: "Mueble industrial",
    //     details: {
    //         portraitImg: {
    //             imgSrc: "/assets/img/projectsPage/products/soporteAuricular/Strong_Wood_IG-93.webp",
    //             imgAlt: "Soporte Auricular",
    //             objPosition: "80% 0%"
    //         },
    //         rectangleImg: {
    //             imgSrc: "/assets/img/projectsPage/products/soporteAuricular/soporteAuricular1.webp",
    //             imgAlt: "Soporte Auricular",
    //             objPosition: "60% 90%"
    //         },
    //         technicalInfo: {
    //             image: {
    //                 imgSrc: "/assets/img/projectsPage/products/soporteAuricular/soporteAuricular3.webp",
    //                 imgAlt: "Soporte Auricular",
    //                 objPosition: "30% 75%"
    //             },
    //             title: "Soporte Auricular",
    //             description: [
    //                 "Lanzamiento de colección de muebles industriales, que fusiona hierro y madera para lucir una expresión unica de rudeza y elegancia.",
    //                 "Cada pieza busca crear espacios auténticos y acogedores.",
    //             ],
    //             footer: {
    //                 materials: ["Madera, ", " Hierro, ", "Laca, ", "Goma protectora"],
    //                 propousal: ["Mueble industrial"],
    //                 year: ["2022"],
    //             }
    //         }
    //     },
    //     categories: ["products"],
    //     urlSlug: "products"
    // },
}