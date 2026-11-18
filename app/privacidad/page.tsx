import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos y Condiciones & Política de Privacidad | Mentora",
  description:
    "Términos y condiciones de uso y política de privacidad de Mentora Group Beltrán S.A.C. conforme a la legislación de la República del Perú.",
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-columbia/90 sm:px-6 sm:py-16">
      {/* Volver */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-tiffany hover:text-white transition-colors"
        >
          <span>←</span>
          <span>Volver a la landing</span>
        </Link>
      </div>

      {/* Header */}
      <header className="border-b border-white/10 pb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-tiffany">
          Información Legal
        </span>
        <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Términos y Condiciones & Política de Privacidad
        </h1>
        <p className="mt-2 text-sm text-columbia/70">
          Última actualización: Noviembre 2026 · Vigente para MENTORA GROUP BELTRAN S.A.C.
        </p>

        {/* Ficha Resumen de Identificación */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 text-xs sm:text-sm space-y-2 text-slate-200">
          <p>
            <strong className="text-white">Razón Social:</strong> MENTORA GROUP BELTRAN S.A.C.
          </p>
          <p>
            <strong className="text-white">RUC:</strong> 20614884267
          </p>
          <p>
            <strong className="text-white">Domicilio Fiscal:</strong> Av. República de Panamá 3623 Oficina 1501, San Isidro, Lima, Perú.
          </p>
          <p>
            <strong className="text-white">Contacto:</strong>{" "}
            <a href="mailto:info@mentora.pe" className="text-tiffany hover:underline">
              info@mentora.pe
            </a>{" "}
            · Teléfono: +51 938 938 858
          </p>
        </div>
      </header>

      {/* Contenido Cláusulas */}
      <div className="mt-10 space-y-9 leading-relaxed text-sm sm:text-base text-slate-300 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h3]:font-semibold [&_h3]:text-white [&_h3]:text-base [&_p]:mt-2.5 [&_ul]:mt-2.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
        
        {/* 1 */}
        <section>
          <h2>1. Objeto y Aceptación</h2>
          <p>
            El presente documento establece los Términos y Condiciones (en adelante, “T&C”) que rigen el acceso y uso del sitio web{" "}
            <a href="https://www.mentora.pe/" target="_blank" rel="noopener noreferrer" className="text-tiffany hover:underline">
              https://www.mentora.pe/
            </a>{" "}
            (en adelante, “el Sitio Web”), propiedad de MENTORA GROUP BELTRAN S.A.C. (en adelante, “MENTORA”).
          </p>
          <p>
            Al ingresar y utilizar este Sitio Web, el visitante (en adelante, “el Usuario”) admite haber leído, entendido y aceptado en su totalidad los T&C aquí descritos. El uso del Sitio Web, así como la compra de cualquier producto, tiene un carácter obligatorio y vinculante. Aquellas personas que no estén de acuerdo con los T&C deberán abstenerse de utilizar el Sitio Web. La relación entre MENTORA y el Usuario se regirá e interpretará de acuerdo con las leyes de la República del Perú.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2>2. Identificación del Proveedor</h2>
          <p>
            El Sitio Web es propiedad de MENTORA GROUP BELTRAN S.A.C., con RUC N° 20614884267, cuyo domicilio fiscal se encuentra en Av. República de Panamá 3623 Oficina 1501, Distrito de San Isidro, Provincia y Departamento de Lima, Perú. Para cualquier comunicación, puede contactarnos a través de:
          </p>
          <ul>
            <li>
              <strong>Correo electrónico:</strong>{" "}
              <a href="mailto:info@mentora.pe" className="text-tiffany hover:underline">
                info@mentora.pe
              </a>
            </li>
            <li>
              <strong>Teléfono:</strong> +51 938 938 858
            </li>
          </ul>
        </section>

        {/* 3 */}
        <section>
          <h2>3. Información del Servicio y Planes Disponibles</h2>
          <p>
            MENTORA ofrece servicios educativos digitales especializados en la enseñanza de inglés, bajo un modelo de microlearning. Su propuesta de valor consiste en: <em>“Aprende inglés en cápsulas de 6 minutos, con certificación oficial, al precio más accesible del mercado.”</em> (Entiéndase por “cápsulas” a las videograbaciones de 6 minutos — como máximo — disponibles por cada curso adquirido por el Usuario).
          </p>
          <p className="font-semibold text-white mt-4">Los servicios disponibles son:</p>
          <ul>
            <li>
              <strong>a) Plan Premium (Mensual, semestral y anual):</strong> Acceso completo al catálogo de cursos. Certificación oficial avalada por British House International y convenios con MINEDU. Mentoría 100% virtual en vivo. Recursos descargables, Master Class en vivo e IA Speaking Feedback. Para la frecuencia mensual, se requiere una permanencia mínima de cuatro (4) meses y aprobar los módulos correspondientes para solicitar el certificado.
            </li>
            <li>
              <strong>b) Canal Corporativo (B2B):</strong> Licencias por volumen para empresas, con acceso a la plataforma y acompañamiento especializado. Condiciones: contratación mediante diagnóstico previo y negociación comercial, con facturación electrónica conforme a SUNAT.
            </li>
          </ul>
        </section>

        {/* 4 */}
        <section>
          <h2>4. Condiciones Académicas y Certificación</h2>
          <p>
            Para solicitar el certificado oficial avalado por British House International y con convenios con el Ministerio de Educación (MINEDU), el Usuario deberá cumplir con una permanencia mínima de cuatro (4) meses en el plan contratado y aprobar los módulos correspondientes.
          </p>
          <p>
            En el caso de los Cursos Individuales, no se requiere permanencia mínima; únicamente la aprobación de los módulos para la obtención del certificado.
          </p>
          <p>
            El acceso parcial o total al contenido, la descarga de materiales o el uso de beneficios asociados (certificados, evaluaciones, accesos especiales) se considerará como uso efectivo del servicio. El incumplimiento de estos requisitos académicos imposibilita la emisión del certificado oficial.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2>5. Capacidad Legal y Acceso de Usuarios</h2>
          <p>
            El acceso y uso del Sitio Web está dirigido a personas mayores de 18 años, quienes declaran disponer de la capacidad jurídica necesaria para sujetarse a los presentes T&C y contratar los servicios educativos ofrecidos por MENTORA. Los menores de edad también podrán acceder a los cursos y suscripciones de idiomas ofrecidos en la plataforma, siempre que cuenten con el consentimiento y supervisión de sus padres, tutores o representantes legales, quienes asumirán plena responsabilidad por el uso de la plataforma y por las obligaciones derivadas de la contratación.
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2>6. Registro de Usuario y Responsabilidad por Contraseña</h2>
          <ul>
            <li>
              <strong>6.1. Creación de Cuenta:</strong> El Usuario podrá registrarse en el Sitio Web creando una cuenta personal para acceder a los cursos, suscripciones y beneficios exclusivos de la plataforma. La cuenta de Usuario es personal, única e intransferible.
            </li>
            <li>
              <strong>6.2. Veracidad de la Información:</strong> El Usuario se compromete a proporcionar datos de registro veraces, exactos y completos (nombre, correo electrónico, documento de identidad y demás información solicitada), y a mantenerlos actualizados. MENTORA podrá verificar la información y suspender o anular aquellas cuentas cuyos datos no hayan podido ser confirmados, resulten fraudulentos o se detecte un uso indebido de la plataforma.
            </li>
            <li>
              <strong>6.3. Confidencialidad de la Contraseña:</strong> El Usuario es el único responsable de mantener la confidencialidad de su contraseña y de no compartirla con terceros.
            </li>
            <li>
              <strong>6.4. Presunción de Uso:</strong> Todas las acciones realizadas desde una cuenta de Usuario se presumirán efectuadas por el titular de dicha cuenta. MENTORA no se responsabilizará por los daños derivados del uso no autorizado de la cuenta y contraseña de un Usuario.
            </li>
            <li>
              <strong>6.5. Deber de Notificación:</strong> En caso de que un Usuario sospeche o identifique que un tercero ha accedido a su cuenta, deberá notificarlo de manera inmediata a MENTORA a través del correo electrónico{" "}
              <a href="mailto:info@mentora.pe" className="text-tiffany hover:underline">
                info@mentora.pe
              </a>{" "}
              para proceder con las medidas de seguridad correspondientes.
            </li>
          </ul>
        </section>

        {/* 7 */}
        <section>
          <h2>7. Proceso de Compra y Suscripción</h2>
          <ul>
            <li>
              <strong>7.1. Información del Servicio:</strong> MENTORA se compromete a que la información detallada en la descripción de cada curso, plan de suscripción o servicio educativo sea veraz, clara y suficiente para que el Usuario pueda tomar una decisión informada.
            </li>
            <li>
              <strong>7.2. Contenido Digital:</strong> Las imágenes, videos y materiales promocionales que aparecen en el Sitio Web son referenciales. El Usuario deberá guiarse por la información textual contenida en la descripción del curso o plan.
            </li>
            <li>
              <strong>7.3. Precios:</strong> Todos los precios de los cursos y planes de suscripción están expresados en moneda nacional — Soles (S/) — e incluyen los impuestos aplicables. El detalle del precio y la periodicidad del cobro (mensual, anual o por curso individual) será mostrado antes de que el Usuario confirme la compra.
            </li>
            <li>
              <strong>7.4. Medios de Pago:</strong> El Usuario podrá realizar el pago a través de los medios habilitados en la pasarela de pago (tarjeta de crédito/débito, Yape, Plin, transferencia bancaria u otros disponibles).
            </li>
            <li>
              <strong>7.5. Comprobantes de Pago:</strong> Por cada compra o suscripción, MENTORA emitirá el comprobante de pago correspondiente (boleta o factura electrónica), el cual será enviado al correo electrónico registrado por el Usuario.
            </li>
            <li>
              <strong>7.6. Validación y Confirmación:</strong> Toda compra o suscripción realizada en el Sitio Web está sujeta a un proceso de validación por parte de MENTORA. La recepción de una orden de compra no implica su aceptación automática. MENTORA verificará la validez del medio de pago y la veracidad de los datos del Usuario. Solo tras esta validación se procederá a activar el acceso al curso o plan contratado.
            </li>
            <li>
              <strong>7.7. Acceso al Servicio:</strong> Una vez confirmado el pago, el Usuario recibirá las credenciales y/o confirmación de acceso a la plataforma digital de MENTORA, de acuerdo con el plan o curso adquirido.
            </li>
          </ul>
        </section>

        {/* 8 */}
        <section>
          <h2>8. Activación y Acceso al Servicio</h2>
          <ul>
            <li>
              <strong>8.1. Cobertura:</strong> Los servicios de MENTORA están disponibles de manera virtual en todo el territorio peruano y en el extranjero, siempre que el Usuario cuente con conexión a internet y cumpla con los requisitos técnicos mínimos de la plataforma.
            </li>
            <li>
              <strong>8.2. Activación del Servicio:</strong> Una vez confirmado el pago y validada la transacción, el Usuario recibirá un correo electrónico con la confirmación de su compra y las credenciales de acceso a la plataforma. La activación es inmediata, salvo incidencias técnicas que serán comunicadas oportunamente.
            </li>
            <li>
              <strong>8.3. Duración del Acceso:</strong> El acceso a los cursos o planes de suscripción se mantendrá vigente durante el período contratado (mensual, anual o por curso individual), conforme a lo indicado en la descripción del servicio.
            </li>
            <li>
              <strong>8.4. Condiciones de Uso:</strong> El acceso es personal e intransferible. El Usuario no podrá compartir sus credenciales con terceros. En caso de detectarse uso indebido o compartido de la cuenta, MENTORA se reserva el derecho de suspender o cancelar el acceso sin derecho a reembolso.
            </li>
            <li>
              <strong>8.5. Soporte Técnico:</strong> En caso de problemas de acceso o fallas técnicas, el Usuario podrá comunicarse con el área de soporte de MENTORA a través del correo electrónico{" "}
              <a href="mailto:info@mentora.pe" className="text-tiffany hover:underline">
                info@mentora.pe
              </a>
              , donde se le brindará asistencia en un plazo razonable.
            </li>
          </ul>
        </section>

        {/* 9 */}
        <section>
          <h2>9. Política de Cancelaciones y Cambios de Plan</h2>
          <div className="space-y-4 mt-3">
            <div>
              <h3>9.1. Cancelaciones</h3>
              <p>
                El Usuario mantiene acceso a la plataforma hasta el último día del período ya pagado, incluso si solicita la cancelación.
              </p>
              <p>
                En el Plan Premium Mensual, la cancelación solo procede si el Usuario envía un correo electrónico a{" "}
                <a href="mailto:info@mentora.pe" className="text-tiffany hover:underline">
                  info@mentora.pe
                </a>
                , con un preaviso mínimo de 15 días. De no cumplirse este requisito, la cancelación no será válida.
              </p>
              <p>
                En los Cursos Individuales (A1, A2, B1 y B2), el Usuario mantiene acceso por un período de doce (12) meses desde la activación de la compra. La cancelación no genera penalidad alguna, pero no procede devolución bajo ningún concepto una vez activada la compra.
              </p>
              <p>
                Si el alumno incumple con el pago de su suscripción, se procederá a la cancelación automática del acceso a la plataforma a las veinticuatro (24) horas siguientes. Este incumplimiento no genera reporte a centrales de riesgo.
              </p>
              <p>
                No existe opción de suspensión temporal (“pausa”) del servicio durante la primera fase de implementación de la plataforma.
              </p>
              <p>
                <strong>Canal y plazo:</strong> Las solicitudes de cancelación deberán enviarse únicamente por correo electrónico a{" "}
                <a href="mailto:info@mentora.pe" className="text-tiffany hover:underline">
                  info@mentora.pe
                </a>
                . MENTORA responderá en un plazo máximo de dos (2) días hábiles. La solicitud deberá ser clara, trazable y auditable, indicando: nombre completo, correo registrado en la plataforma, número de documento de identidad, plan que se desea cancelar, fecha de inicio de cancelación y confirmación expresa del Usuario.
              </p>
            </div>

            <div>
              <h3>9.2. Cambios de Plan</h3>
              <p>
                El Usuario podrá solicitar modificaciones en su suscripción conforme a las siguientes disposiciones:
              </p>
              <p>
                El Usuario podrá cambiar la frecuencia de su suscripción Premium (mensual, 6 meses o 12 meses). Si el cambio es hacia una frecuencia de mayor duración, este se aplicará inmediatamente e iniciará un nuevo período de permanencia. Si el cambio es hacia una frecuencia de menor duración, este se aplicará al finalizar el período contratado, sin derecho a reembolso por el tiempo ya pagado.
              </p>
            </div>
          </div>
        </section>

        {/* 10 */}
        <section>
          <h2>10. Reembolsos y Devoluciones</h2>
          <div className="space-y-4 mt-3">
            <div>
              <h3>10.1. Reembolsos</h3>
              <ul>
                <li>
                  <strong>Plazo:</strong> El Usuario deberá presentar su solicitud dentro de los treinta (30) días calendario siguientes a la fecha del cobro que origina el reclamo.
                </li>
                <li>
                  <strong>Supuesto aplicable:</strong> Únicamente procede reembolso en caso de cobro duplicado, previa validación por el área de finanzas de MENTORA.
                </li>
                <li>
                  <strong>Ejecución:</strong> El reembolso se efectuará en un plazo máximo de cinco (5) días hábiles, utilizando el mismo medio de pago empleado por el Usuario.
                </li>
                <li>
                  <strong>Procedimiento:</strong> La solicitud deberá enviarse por correo electrónico a{" "}
                  <a href="mailto:info@mentora.pe" className="text-tiffany hover:underline">
                    info@mentora.pe
                  </a>
                  , indicando nombre completo, correo registrado, curso o plan adquirido y comprobante de pago.
                </li>
              </ul>
              <p>
                No procederán reembolsos por desinterés posterior a la compra, problemas de conexión o equipos del Usuario, uso indebido o compartido de la cuenta, incumplimiento de requisitos académicos, ni cuando el Usuario haya accedido parcial o totalmente al contenido del curso, descargado materiales o utilizado beneficios asociados (certificados, evaluaciones, accesos especiales).
              </p>
              <p>
                Todo reembolso aprobado generará una Nota de Crédito Electrónica, remitida al correo electrónico registrado del Usuario.
              </p>
            </div>

            <div>
              <h3>10.2. Devoluciones</h3>
              <p>
                Las devoluciones se encuentran reguladas bajo criterios específicos, en atención a que el alumno recibe información completa del producto antes de su adquisición (descripción, temario y duración).
              </p>
              <ul>
                <li>
                  <strong>Devolución de dinero:</strong> Únicamente procede en caso de cobro duplicado, previa validación por el área de finanzas.
                </li>
                <li>
                  <strong>Falla técnica atribuible a Mentora:</strong> Si el servicio se ve interrumpido por más de ocho (8) horas continuas, el alumno recibirá una extensión equivalente al tiempo perdido. En este supuesto no procede devolución de dinero.
                </li>
              </ul>
              <p>
                En los casos aplicables, el reembolso se efectuará al mismo medio de pago utilizado por el alumno, dentro de un plazo máximo de cinco (5) días hábiles.
              </p>
            </div>
          </div>
        </section>

        {/* 11 */}
        <section>
          <h2>11. Uso del Sitio Web</h2>
          <p>
            El Usuario se compromete a utilizar el Sitio Web de conformidad con la Ley, los presentes T&C, la moral y las buenas costumbres. El Usuario se obliga a no utilizar el Sitio Web con fines o efectos ilícitos, lesivos de los intereses o derechos de terceros, o que de cualquier forma puedan dañar, inutilizar o deteriorar la plataforma.
          </p>
        </section>

        {/* 12 */}
        <section>
          <h2>12. Tratamiento de Datos Personales</h2>
          <p>
            El tratamiento de los datos personales que el Usuario nos proporciona se realiza de acuerdo con las leyes vigentes y en cumplimiento de la Ley N° 29733 (Ley de Protección de Datos Personales de la República del Perú) y su Reglamento. Los datos serán utilizados exclusivamente para gestionar la compra, la entrega de los servicios educativos, la atención de consultas y emitir los comprobantes de pago correspondientes.
          </p>
        </section>

        {/* 13 */}
        <section>
          <h2>13. Libro de Reclamaciones</h2>
          <p>
            Conforme a lo dispuesto en el Código de Protección y Defensa del Consumidor, MENTORA cuenta con un Libro de Reclamaciones a su disposición:
          </p>
          <p>
            👉{" "}
            <a
              href="https://www.mentora.pe/libro-reclamaciones"
              target="_blank"
              rel="noopener noreferrer"
              className="text-tiffany font-semibold underline underline-offset-2"
            >
              Libro de Reclamaciones Virtual de Mentora
            </a>
          </p>
        </section>

        {/* 14 */}
        <section>
          <h2>14. Fuerza Mayor</h2>
          <p>
            MENTORA no será responsable por cualquier retraso o falla en el cumplimiento de sus obligaciones que resulte, directa o indirectamente, de un evento de fuerza mayor o caso fortuito, incluyendo, pero sin limitarse a, desastres naturales, huelgas, guerras, restricciones gubernamentales o fallas en las líneas de comunicación.
          </p>
        </section>

        {/* 15 */}
        <section>
          <h2>15. Cesión de Posición Contractual</h2>
          <p>
            El Usuario autoriza expresamente la cesión de estos T&C en favor de cualquier persona que adquiera los derechos sobre el Sitio Web o que sea el nuevo responsable de la operación comercial. Una vez producida la cesión, el nuevo responsable asumirá todas las obligaciones de MENTORA establecidas en los presentes T&C.
          </p>
        </section>

        {/* 16 */}
        <section>
          <h2>16. Modificación de los Términos y Condiciones</h2>
          <p>
            MENTORA se reserva la potestad de modificar en cualquier momento los presentes T&C. Cualquier modificación será publicada en esta página y entrará en vigor desde su publicación. Dichas modificaciones no se aplicarán a las transacciones que ya hayan sido concluidas y pagadas por el Usuario.
          </p>
        </section>

        {/* 17 */}
        <section>
          <h2>17. Errores, Inexactitudes y Omisiones</h2>
          <p>
            Puede existir información en nuestro Sitio Web o en el Servicio que contenga errores tipográficos, inexactitudes u omisiones relacionadas con las descripciones de cursos, planes de suscripción, precios, promociones, ofertas, condiciones académicas o disponibilidad de acceso a la plataforma. MENTORA se reserva el derecho de corregir dichos errores, inexactitudes u omisiones, así como de cambiar o actualizar la información o cancelar suscripciones si alguna información en el Servicio o en cualquier sitio web relacionado resulta inexacta, en cualquier momento y sin previo aviso, incluso después de que el Usuario haya realizado la compra.
          </p>
          <p>
            MENTORA no asume obligación alguna de actualizar, corregir o aclarar la información publicada en el Sitio Web o en cualquier sitio relacionado, incluyendo, sin limitación, la información de precios o condiciones de los planes, salvo cuando sea requerido por la ley.
          </p>
        </section>

        {/* 18 */}
        <section>
          <h2>18. Usos Prohibidos</h2>
          <p>En adición a otras prohibiciones como se establece en los Términos y Condiciones del Servicio, se prohíbe el uso del sitio o su contenido:</p>
          <ul>
            <li>Para ningún propósito ilegal;</li>
            <li>Para pedirle a otros que realicen o participen en actos ilícitos;</li>
            <li>Para violar cualquier regulación, reglas, leyes internacionales, federales, provinciales o estatales, u ordenanzas locales;</li>
            <li>Para infringir o violar el derecho de propiedad intelectual nuestro o de terceras partes;</li>
            <li>Para acosar, abusar, insultar, dañar, difamar, calumniar, desprestigiar, intimidar o discriminar por razones de género, orientación sexual, religión, raza, edad, nacionalidad o discapacidad;</li>
            <li>Para presentar información falsa o engañosa;</li>
            <li>Para cargar o transmitir virus o cualquier otro tipo de código malicioso que sea o pueda ser utilizado en cualquier forma que pueda comprometer la funcionalidad o el funcionamiento del Servicio o de cualquier sitio web relacionado, otros sitios o Internet;</li>
            <li>Para recopilar o rastrear información personal de otros;</li>
            <li>Para generar spam, phish, pharm, pretext, spider, crawl, or scrape;</li>
            <li>Para cualquier propósito obsceno o inmoral; o</li>
            <li>Para interferir con o burlar los elementos de seguridad de la plataforma virtual.</li>
          </ul>
          <p className="mt-2 text-xs text-columbia/70">
            Nos reservamos el derecho de suspender el uso del Servicio o de cualquier otra plataforma virtual relacionada por violar cualquiera de los ítems de los usos prohibidos.
          </p>
        </section>

        {/* 19 */}
        <section>
          <h2>19. Divisibilidad</h2>
          <p>
            En el caso de que se determine que cualquier disposición de estos Términos y Condiciones del Servicio sea ilegal, nula o inejecutable, dicha disposición será, no obstante, efectiva a obtener la máxima medida permitida por la ley aplicable, y la parte no exigible se considerará separada de estos Términos y Condiciones del Servicio, dicha determinación no afectará la validez de aplicabilidad de las demás disposiciones restantes.
          </p>
        </section>

        {/* 20 */}
        <section>
          <h2>20. Rescisión</h2>
          <p>
            Cualquiera de las partes podrá dar por terminado el presente acuerdo en cualquier momento. El Usuario podrá hacerlo dejando de utilizar los servicios y/o solicitando la cancelación de su suscripción conforme a lo previsto en estos Términos y Condiciones.
          </p>
          <p>
            Por su parte, MENTORA podrá dar por terminado el acuerdo si el Usuario incumple las obligaciones establecidas en estos Términos y Condiciones, incluyendo el uso indebido de la plataforma, el incumplimiento en el pago de la suscripción, la falsedad en los datos proporcionados o cualquier otra causa justificada conforme a la normativa aplicable.
          </p>
          <p>
            Las obligaciones y responsabilidades que hayan surgido antes de la fecha de terminación seguirán siendo válidas tras la finalización del presente acuerdo, incluyendo las relativas a pagos pendientes, uso efectivo del servicio y limitaciones de responsabilidad.
          </p>
        </section>

        {/* 21 */}
        <section>
          <h2>21. Acuerdo Completo</h2>
          <p>
            Si en algún momento MENTORA decide no exigir el cumplimiento de alguna parte de estos Términos y Condiciones, ello no debe entenderse como una renuncia a ese derecho. MENTORA conserva la facultad de hacerlo valer en cualquier momento posterior. Estos Términos y Condiciones del Servicio, las políticas o reglas de operación publicadas por MENTORA, constituyen el acuerdo completo y el entendimiento entre el usuario y MENTORA. Asimismo, rigen el uso del Servicio y/o reemplaza cualquier acuerdo, comunicación o propuesta anterior como actual pudiendo ser oral o escrita, entre el Usuario y MENTORA. Esto incluye y no limita cualquier versión previa de los Términos y Condiciones del Servicio.
          </p>
          <p>
            Cualquier ambigüedad parcializada externa en la interpretación de la redacción de estos Términos y Condiciones del Servicio no deberán ser mal interpretadas, ni serán pasibles de sanción y/o demanda en contra del grupo de redacción de MENTORA.
          </p>
        </section>

        {/* 22 */}
        <section>
          <h2>22. Uso y Garantía del Sitio Web</h2>
          <p>
            MENTORA advierte que su sitio web puede tener interrupciones por mantenimiento o causas ajenas a su control, aunque hará todo lo razonable para restablecer su operatividad. Aplica medidas de seguridad, pero no garantiza la ausencia total de virus u otros elementos externos.
          </p>
          <p>
            Al aceptar estos Términos y Condiciones, el Usuario se compromete a mantener indemne a MENTORA y su equipo ante reclamos derivados del uso inadecuado del sitio, el incumplimiento de normas legales o la afectación de derechos de terceros.
          </p>
        </section>

        {/* 23 */}
        <section>
          <h2>23. Derechos de Propiedad Intelectual e Industrial</h2>
          <p>
            El Usuario reconoce que todos los derechos sobre el contenido del sitio (marcas, logotipos, textos, imágenes, diseños, videos, software, entre otros) pertenecen exclusivamente a MENTORA. Se permite visualizar, imprimir, descargar y almacenar este contenido solo para uso personal, privado y sin fines comerciales. Está prohibida cualquier modificación, distribución o uso distinto sin autorización expresa previa de MENTORA.
          </p>
          <p>
            El acceso al sitio o la aceptación de estos Términos no implica cesión ni licencia de derechos a favor del Usuario o terceros.
          </p>
        </section>

        {/* 24 */}
        <section>
          <h2>24. Protección de Datos</h2>
          <p>
            Los datos personales que los Usuarios Registrados proporcionen en el Registro, serán tratados según lo dispone la Ley N° 29733, Ley de Protección de Datos Personales y su Reglamento, aprobado mediante Decreto Supremo N° 016-2024-JUS y demás normas conexas. En ese sentido, MENTORA se obliga al cumplimiento estricto de las normas anteriormente mencionadas, así como a mantener los estándares máximos de seguridad, protección, resguardo, conservación y confidencialidad de la información recibida o enviada.
          </p>
          <p>
            Los Usuarios Registrados declaran que los datos personales han sido entregados de forma absolutamente libre y voluntaria, sin ningún tipo de presión, obligación o condición de por medio.
          </p>
        </section>

        {/* 25 */}
        <section>
          <h2>25. Información de Contacto</h2>
          <p>
            Preguntas acerca de los Términos y Condiciones del Servicio deberán ser enviadas a la siguiente dirección electrónica:{" "}
            <a href="mailto:info@mentora.pe" className="text-tiffany font-semibold hover:underline">
              info@mentora.pe
            </a>
          </p>
        </section>

        {/* 26 */}
        <section>
          <h2>26. Ley Aplicable y Jurisdicción</h2>
          <p>
            Los presentes Términos y Condiciones, así como la relación entre MENTORA y el Usuario, se regirán e interpretarán con arreglo a la legislación vigente en la República del Perú, y ante cualquier controversia que se suscite será resuelta a través de los tribunales peruanos de Lima.
          </p>
        </section>
      </div>

      {/* Footer enlace volver */}
      <div className="mt-14 border-t border-white/10 pt-8 text-center text-xs text-columbia/60">
        <p>© 2026 {site.legalEntity} · Todos los derechos reservados.</p>
        <div className="mt-3">
          <Link href="/" className="text-tiffany hover:underline">
            Volver a la página principal
          </Link>
        </div>
      </div>
    </main>
  );
}
