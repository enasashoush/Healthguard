import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./homeSlider.css";

const quotes = [
    "Medicine heals doubts as well as diseases.",
    "Medicine in the future will give everyone the ability to become their own best healer",
    "The greatest wealth is health. – Virgil ",
    "Medicine is not only a science; it is also an art. It does not consist of compounding pills and plasters; it deals with the very processes of life, which must be understood before they may be guided.– Paracelsus",
    "Medicine is not only a science; it is also an art. It does not consist of compounding pills and plasters; it deals with the very processes of life, which must be understood before they may be guided. – Paracelsus",
    "Managing chronic pain in special needs patients requires a multidisciplinary approach, combining medical treatments with physical therapy, psychological support, and adaptive technologies to enhance quality of life. — Dr. Sarah Bennett, Pain Management Specialist",
    "The key to addressing communication barriers in special needs healthcare is the use of augmentative and alternative communication devices, ensuring patients can express their needs and participate actively in their care. — Dr. Alicia Morgan, Speech-Language Pathologist",
    "For patients with mobility impairments, integrating advanced prosthetics and robotic-assisted therapies can significantly improve independence and functionality, transforming daily living experiences. — Dr. Ethan Lewis, Orthopedic Surgeon",
    "Behavioral challenges in special needs patients can be effectively managed through personalized behavioral therapy plans, supported by medication when necessary, to promote stability and emotional well-being. — Dr. Christine Walker, Clinical Psychologist",
    "Nutritional deficiencies in special needs patients often require tailored dietary plans and the use of supplements, overseen by dietitians, to ensure balanced nutrition and optimal health. — Dr. Laura Kim, Dietitian",
    "Epileptic conditions in special needs patients are best managed through a combination of anticonvulsant medications, lifestyle adjustments, and regular monitoring to reduce seizure frequency and severity. — Dr. Robert Evans, Neurologist",
    "To address sensory processing disorders, occupational therapy utilizing sensory integration techniques can help patients better manage their reactions to sensory stimuli, enhancing their daily interactions. — Dr. Megan Roberts, Occupational Therapist",
    "Early intervention with specialized educational programs and therapies is crucial in addressing developmental delays, ensuring children with special needs achieve their full potential. — Dr. Emily Ross, Pediatric Developmental Specialist",
    "Respiratory issues in special needs patients can be managed through a combination of respiratory therapies, the use of assistive devices like CPAP machines, and vigilant monitoring to prevent complications. — Dr. John Patel, Pulmonologist",
    "Managing anxiety and mental health issues in special needs patients requires an integrated approach, combining cognitive-behavioral therapy, medication, and supportive environments to foster mental wellness. — Dr. Karen Hughes, Psychiatrist"
];

export default function HomeSlider() {
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        }, 24 * 60 * 60 * 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const settings = {
        dots: false,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: true,
        arrows: false,
    };

    return (
        <div className="container ">
            <div className="slider-container ">
                <Slider key={currentQuoteIndex} {...settings} initialSlide={currentQuoteIndex}>
                    {quotes.map((quote, index) => (
                        <div key={index} className="quote-container">
                            <p className="quote-text col-6">{quote}</p>
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="row-3"></div>
        </div>
    );
}