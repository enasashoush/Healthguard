import './about.css'
import { Helmet } from 'react-helmet';
export default function About() {



    return <>

        <Helmet>
            <title>About Us</title>
        </Helmet>

        <style>{`
        body {
          background: linear-gradient(to top, #072E33, #009578); 
          margin: 0;
          padding: 0; 
        }
      `}</style>
        <section class="about-section container mt-5 pt-5">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <h2 class="about-heading text-main">Our Mission</h2>
                        <p class="about-content">We are a leading provider of high-quality medical supplements, dedicated to improving the health and well-being of our customers. With a team of experienced professionals and a commitment to scientific research, we strive to offer safe and effective supplements that meet the unique needs of individuals.</p>
                        <p class="about-content">At Medical Supplements, we believe in the power of natural ingredients and evidence-based formulations. Our products are carefully developed using the latest advancements in medical research to ensure optimal results and customer satisfaction.</p>
                    </div>
                    <div class="col-lg-6">
                        <img class="about-image w-100" src={require('../../image/about.jpeg')} alt="About Us" />
                    </div>
                </div>
            </div>
        </section>

    </>

}