import React from 'react';
import Layout from "../components/layout";
import Home from '../components/contactus/home';
import Footer from '../components/footer';
import ContactPage from '../components/contactus/talktous';

function Contact() {
    return (
            <div className="bg-black font-instrument">
                <Home />
                <ContactPage />
                <Footer />
            </div>
    );
}

export default Contact;