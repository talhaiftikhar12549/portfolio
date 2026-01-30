import React from 'react';

const SchemaOrg = () => {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Person",
                    "name": "Talha Iftikhar",
                    "url": "https://www.talhaiftikhar.com",
                    "jobTitle": "Software Engineer & Web Developer",
                    "sameAs": [
                        "https://github.com/talhaiftikhar12549",
                        "https://www.linkedin.com/in/muhammadtalha12549/",
                        "https://www.instagram.com/talhaiftikhar12549/"
                    ]
                })
            }}
        />
    );
};

export default SchemaOrg;
