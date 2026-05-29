import React from 'react';
import Navbar from '../components/Navbar';
import FooterSignature from '../components/FooterSignature';
import SEO from '../components/SEO';

const Privacy: React.FC = () => {
    return (
        <div className="relative min-h-screen bg-paper-dark selection:bg-primary/20 overflow-x-hidden">
            <SEO
                title="Privacidad | Manta Studio"
                description="Política de privacidad de Manta Studio — cómo recopilamos, usamos y protegemos tus datos personales."
            />
            <Navbar />

            <main className="relative pt-32 pb-20 px-6 md:px-12 xl:px-24">
                <div className="absolute inset-0 pointer-events-none opacity-20"
                    style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }}
                />

                <article className="relative z-10 max-w-3xl mx-auto">
                    <h1 className="font-display text-4xl md:text-6xl font-medium text-white tracking-tighter mb-4">
                        Política de <span className="text-primary">Privacidad</span>
                    </h1>
                    <p className="font-mono text-xs text-white/40 uppercase tracking-widest mb-12">
                        Última actualización: Mayo 2026
                    </p>

                    <div className="prose prose-invert prose-sm md:prose-base max-w-none font-sans text-white/70 leading-relaxed space-y-8">
                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white font-medium mb-4">1. Responsable del Tratamiento</h2>
                            <p>
                                Manta Studio (en adelante, "Manta", "nosotros" o "el Estudio"), con sede en Mendoza y Santiago del Estero, Argentina, es el responsable del tratamiento de los datos personales recopilados a través de este sitio web.
                            </p>
                            <p>
                                Para comunicarte con nuestro Delegado de Protección de Datos, podés escribirnos a través del formulario de contacto en manta.com.ar.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white font-medium mb-4">2. Datos que Recopilamos</h2>
                            <p>Podemos recopilar la siguiente información cuando utilizás nuestros servicios o interactuás con nuestro sitio:</p>
                            <ul className="list-disc pl-6 space-y-2 text-white/60">
                                <li>Nombre y apellido</li>
                                <li>Dirección de correo electrónico</li>
                                <li>Mensaje o consulta enviada a través del formulario de contacto</li>
                                <li>Datos de navegación (dirección IP, tipo de navegador, páginas visitadas) mediante cookies analíticas</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white font-medium mb-4">3. Finalidad del Tratamiento</h2>
                            <p>Tratamos tus datos personales con las siguientes finalidades:</p>
                            <ul className="list-disc pl-6 space-y-2 text-white/60">
                                <li>Responder a tus consultas y solicitudes de información</li>
                                <li>Gestionar la relación comercial o profesional que pudiera surgir</li>
                                <li>Enviar comunicaciones relacionadas con nuestros servicios, previo consentimiento</li>
                                <li>Mejorar la experiencia de navegación en nuestro sitio web</li>
                                <li>Cumplir con obligaciones legales aplicables</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white font-medium mb-4">4. Base Legal del Tratamiento</h2>
                            <p>La base legal para el tratamiento de tus datos es:</p>
                            <ul className="list-disc pl-6 space-y-2 text-white/60">
                                <li>Tu consentimiento explícito al enviarnos un mensaje a través del formulario de contacto</li>
                                <li>La ejecución de medidas precontractuales o contractuales</li>
                                <li>El interés legítimo del Estudio en mejorar sus servicios y experiencia de usuario</li>
                                <li>El cumplimiento de obligaciones legales</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white font-medium mb-4">5. Destinatarios de Datos</h2>
                            <p>
                                No cedemos tus datos personales a terceros, salvo obligación legal. Los datos enviados a través del formulario de contacto son procesados por nuestra plataforma de automatización (n8n) alojada en un VPS con sede en Alemania, cumpliendo con los estándares del RGPD.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white font-medium mb-4">6. Plazos de Conservación</h2>
                            <p>
                                Conservamos tus datos personales durante el tiempo necesario para cumplir con la finalidad para la que fueron recogidos, y como máximo durante dos años desde la última interacción, salvo que exista una obligación legal de conservarlos por un período superior.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white font-medium mb-4">7. Tus Derechos</h2>
                            <p>Podés ejercer tus derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición dirigiéndote a nosotros a través del formulario de contacto. Tenés derecho a retirar tu consentimiento en cualquier momento.</p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white font-medium mb-4">8. Cookies</h2>
                            <p>
                                Este sitio web utiliza únicamente cookies técnicas necesarias para el funcionamiento y cookies analíticas (Umami) que no recopilan datos personales identificables. Umami es una plataforma de analytics respetuosa con la privacidad que no utiliza cookies persistentes ni rastrea a los usuarios entre sitios.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white font-medium mb-4">9. Cambios en la Política de Privacidad</h2>
                            <p>
                                Nos reservamos el derecho de modificar esta política de privacidad para adaptarla a novedades legislativas o cambios en nuestros servicios. Te notificaremos cualquier cambio sustancial a través de nuestro sitio web.
                            </p>
                        </section>
                    </div>
                </article>
            </main>

            <FooterSignature />
        </div>
    );
};

export default Privacy;
