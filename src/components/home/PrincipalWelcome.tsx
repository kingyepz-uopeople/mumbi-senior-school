export default function PrincipalWelcome() {
  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 p-8 md:p-12">
            {/* Portrait placeholder */}
            <div className="flex-shrink-0">
              <div
                className="w-40 h-40 md:w-48 md:h-48 rounded-full flex items-center justify-center shadow-md"
                style={{
                  background: 'linear-gradient(135deg, #800020 0%, #D4AF37 100%)',
                }}
              >
                <span className="text-4xl md:text-5xl font-bold text-white tracking-wider">
                  EWM
                </span>
              </div>
            </div>

            {/* Welcome text */}
            <div className="flex-1 text-center md:text-left">
              <h2
                className="text-2xl md:text-3xl font-bold mb-2"
                style={{ color: '#800020' }}
              >
                Chief Principal&apos;s Welcome
              </h2>
              <div
                className="w-16 h-1 rounded-full mb-6 mx-auto md:mx-0"
                style={{ backgroundColor: '#D4AF37' }}
              />

              <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-6">
                Welcome to Mumbi Girls Senior School — a centre of excellence
                nurturing empowered girls since 1960. Our school stands as a beacon
                of quality education in Murang&apos;a County, blending the rich Kenyan
                educational tradition with the CBC framework to prepare our students
                for a dynamic global society. We are committed to holistic education
                that develops the mind, body, and spirit of every girl who walks
                through our gates. As you explore our portal, I invite you to discover
                the diverse academic pathways, vibrant co-curricular programmes, and
                the strong community of educators that make Mumbi Girls truly
                exceptional.
              </p>

              <div className="border-t pt-4">
                <p
                  className="font-semibold text-lg"
                  style={{ color: '#800020' }}
                >
                  Mrs. Eunice Wangari Muturi
                </p>
                <p style={{ color: '#D4AF37' }} className="text-sm font-medium">
                  Chief Principal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
