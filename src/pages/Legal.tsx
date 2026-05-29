import React from 'react';
import Navbar from '../components/Navbar';
import FooterSignature from '../components/FooterSignature';
import SEO from '../components/SEO';

const Legal: React.FC = () => {
    return (
        <div className="relative min-h-screen bg-paper-dark selection:bg-primary/20 overflow-x-hidden">
            <SEO
                title="Aviso Legal | Manta Studio"
                description="Aviso legal de Manta Studio — información institucional, propiedad intelectual y términos legales del estudio."
            />
            <Navbar />

            <main className="relative pt-32 pb-20 px-6 md:px-12 xl:px-24">
                <div className="absolute inset-0 pointer-events-none opacity-20"
                    style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }}
                />

                <article className="relative z-10 max-w-3xl mx-auto">
                    <h1 className="font-display text-4xl md:text-6xl font-medium text-white tracking-tighter mb-4">
                        Aviso <span className="text-primary">Legal</span>
                    </h1>
                    <p className="font-mono text-xs text-white/40 uppercase tracking-widest mb-12">
                        Última actualización: Mayo 2026
                    </p>

                    <div className="prose prose-invert prose-sm md:prose-base max-w-none font-sans text-white/70 leading-relaxed space-y-8">
                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white font-medium mb-4">1. Información General</h2>
                            <p>
                                En cumplimiento con el deber de información recogido en la normativa vigente, se informa que el sitio web manta.com.ar es operado por:
                            </p>
                            <ul className="list-none space-y-2 text-white/60 bg-white/[0.02] p-6 border border-white/10 rounded-sm">
                                <li><span className="text-white/80 font-medium">Denominación:</span> Manta Studio</li>
                                <li><span className="text-white/80 font-medium">Actividad:</span> Diseño Digital, Desarrollo Web y Dirección de Arte</li>
                                <li><span className="text-white/80 font-medium">Ubicación:</span> Mendoza y Santiago del Estero, Argentina</li>
                                <li><span className="text-white/80 font-medium">Contacto:</span> A través del formulario en manta.com.ar</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white font-medium mb-4">2. Propiedad Intelectual e Industrial</h2>
                            <p>
                                Todos los derechos de propiedad intelectual e industrial sobre los contenidos del Sitio —incluyendo diseño gráfico, código fuente, animaciones, tipografías, logotipos, ilustraciones, fotografías, videos y textos— pertenecen a Manta Studio o a sus legítimos titulares, y están protegidos por las leyes argentinas e internacionales de propiedad intelectual.
                            </p>
                            <p>
                                Queda expresamente prohibida la reproducción, distribución, comunicación pública, transformación o cualquier otra forma de explotación de los contenidos sin la autorización previa y por escrito de Manta Studio, salvo que se trate de uso privado o esté expresamente permitido.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white font-medium mb-4">3. Exclusión de Garantías y Responsabilidad</h2>
                            <p>
                                Manta Studio no se hace responsable de los daños o perjuicios que pudieran derivarse de:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-white/60">
                                <li>Interrupciones del servicio, fallos técnicos o de conexión</li>
                                <li>La presencia de virus u otros elementos dañinos en el Sitio</li>
                                <li>El uso indebido que terceros puedan hacer del Sitio</li>
                                <li>La exactitud, integridad o actualidad de la información proporcionada por terceros</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white font-medium mb-4">4. Enlaces Externos</h2>
                            <p>
                                El Sitio puede contener enlaces a sitios web de terceros. Manta Studio no controla ni asume responsabilidad alguna sobre el contenido, políticas de privacidad o prácticas de estos sitios externos. La inclusión de estos enlaces no implica afiliación, aprobación o asociación con los mismos.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white font-medium mb-4">5. Legislación Aplicable</h2>
                            <p>
                                Este aviso legal se rige por la legislación de la República Argentina. Para cualquier controversia que pudiera derivarse del acceso o uso del Sitio, las partes se someten a la jurisdicción de los tribunales de la Provincia de Mendoza y de la Provincia de Santiago del Estero.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-display text-xl md:text-2xl text-white font-medium mb-4">6. Contacto</h2>
                            <p>
                                Si tenés alguna pregunta sobre este aviso legal o querés solicitar autorización para utilizar nuestros contenidos, podés contactarnos a través del formulario de nuestro sitio web.
                            </p>
                        </section>
                    </div>
                </article>
            </main>

            <FooterSignature />
        </div>
    );
};

export default Legal;
