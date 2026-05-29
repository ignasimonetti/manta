import React from 'react';
import Navbar from '../components/Navbar';
import FooterSignature from '../components/FooterSignature';
import SEO from '../components/SEO';

const Terms: React.FC = () => {
    return (
        <div className="relative min-h-screen bg-paper-dark selection:bg-primary/20 overflow-x-hidden">
            <SEO
                title="Términos del Servicio | Manta Studio"
                description="Términos y condiciones que rigen el uso del sitio web y los servicios profesionales de Manta Studio."
            />
            <Navbar />

            <main className="relative pt-32 pb-20 px-6 md:px-12 xl:px-24">
                <div className="absolute inset-0 pointer-events-none opacity-20"
                    style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }}
                />

                <article className="relative z-10 max-w-3xl mx-auto">
                    <h1 className="font-display text-4xl md:text-6xl font-medium text-white tracking-tighter mb-4">
                        Términos del <span className="text-primary">Servicio</span>
                    </h1>
                    <p className="font-mono text-xs text-white/40 uppercase tracking-widest mb-12">
                        Última actualización: Mayo 2026
                    </p>

                    <div className="prose prose-invert prose-sm md:prose-base max-w-none font-sans text-white/70 leading-relaxed space-y-8">
                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white font-medium mb-4">1. Aceptación de los Términos</h2>
                            <p>
                                Al acceder y utilizar el sitio web manta.com.ar (el "Sitio") y los servicios ofrecidos por Manta Studio (el "Estudio"), aceptás estar sujeto a los presentes Términos del Servicio. Si no estás de acuerdo con estos términos, por favor no utilices nuestros servicios ni accedas al Sitio.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white font-medium mb-4">2. Descripción de los Servicios</h2>
                            <p>
                                Manta Studio ofrece servicios de diseño digital, desarrollo web, branding, dirección de arte y consultoría creativa. El alcance, entregables y plazos de cada proyecto se definirán en una propuesta o contrato específico firmado por ambas partes.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white font-medium mb-4">3. Propiedad Intelectual</h2>
                            <p>
                                Todo el contenido del Sitio —incluyendo pero no limitado a textos, imágenes, animaciones, logotipos, videos y código— es propiedad intelectual de Manta Studio o de sus licenciantes, a menos que se indique lo contrario.
                            </p>
                            <p>
                                Los derechos de propiedad intelectual sobre los entregables del proyecto se transferirán al cliente únicamente tras el pago completo de los servicios acordados, según los términos establecidos en el contrato correspondiente.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white font-medium mb-4">4. Uso del Sitio</h2>
                            <p>Te comprometés a utilizar el Sitio de conformidad con la ley, la moral, el orden público y los presentes términos. Queda prohibido:</p>
                            <ul className="list-disc pl-6 space-y-2 text-white/60">
                                <li>Utilizar el Sitio para fines ilícitos o contrarios a la buena fe</li>
                                <li>Reproducir, distribuir o modificar el contenido sin autorización expresa</li>
                                <li>Introducir virus, código malicioso o cualquier otro elemento que pueda dañar el Sitio</li>
                                <li>Intentar acceder a áreas restringidas del sistema sin autorización</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white font-medium mb-4">5. Comunicaciones</h2>
                            <p>
                                Al enviarnos un mensaje a través del formulario de contacto, aceptás que nos comuniquemos con vos por correo electrónico para responder tu consulta. No utilizaremos tu información para fines de marketing sin tu consentimiento explícito.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white font-medium mb-4">6. Limitación de Responsabilidad</h2>
                            <p>
                                Manta Studio no será responsable por daños directos, indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de uso del Sitio o de los servicios, en la máxima medida permitida por la ley aplicable.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white font-medium mb-4">7. Modificaciones</h2>
                            <p>
                                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el Sitio. Te recomendamos revisar periódicamente esta página para estar al tanto de cualquier cambio.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white font-medium mb-4">8. Ley Aplicable y Jurisdicción</h2>
                            <p>
                                Estos términos se rigen por las leyes de la República Argentina. Cualquier controversia derivada del uso del Sitio o de los servicios se someterá a los tribunales competentes de la Ciudad de Mendoza y de Santiago del Estero, según corresponda.
                            </p>
                        </section>
                    </div>
                </article>
            </main>

            <FooterSignature />
        </div>
    );
};

export default Terms;
