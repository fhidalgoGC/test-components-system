import { useState, useEffect } from "react";
import { Carousel } from "@/lib/ui-library";
import {
  Zap,
  CreditCard,
  Globe,
  Shield,
  Smartphone,
  TrendingUp,
} from "lucide-react";

// Simulación de una llamada API
const fetchProductsFromAPI = async (): Promise<Array<{
  id: number;
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  gradient: string;
}>> => {
  // Simula un delay de red
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simula datos de una API
  return [
    {
      id: 1,
      badge: "API DATA",
      title: "Producto desde API #1",
      description: "Este producto fue cargado dinámicamente desde una API simulada.",
      buttonText: "Ver Más",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: 2,
      badge: "API DATA",
      title: "Producto desde API #2",
      description: "Los datos se cargan de forma asíncrona antes de renderizar el carousel.",
      buttonText: "Comprar",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      id: 3,
      badge: "API DATA",
      title: "Producto desde API #3",
      description: "Puedes mostrar loading states mientras los datos se cargan.",
      buttonText: "Agregar",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
  ];
};

const CarouselDemo = () => {
  const [controlledIndex, setControlledIndex] = useState(0);
  const [reachedMessage, setReachedMessage] = useState<string>("");
  
  // Estado para el carousel con datos de API
  const [apiProducts, setApiProducts] = useState<any[]>([]);
  const [isLoadingAPI, setIsLoadingAPI] = useState(true);
  const [apiError, setApiError] = useState<string>("");

  // Cargar datos de la API al montar el componente
  useEffect(() => {
    const loadAPIData = async () => {
      try {
        setIsLoadingAPI(true);
        setApiError("");
        const products = await fetchProductsFromAPI();
        setApiProducts(products);
      } catch (error) {
        setApiError("Error al cargar productos de la API");
        console.error(error);
      } finally {
        setIsLoadingAPI(false);
      }
    };

    loadAPIData();
  }, []);

  // Featured cards with different colors and content
  const featuredCards = [
    {
      id: 1,
      badge: "DESTACADO",
      title: "Nómina Digital",
      description:
        "Gestiona los pagos de tu equipo de manera eficiente y cumple con todas las regulaciones.",
      buttonText: "Explorar Ahora",
      gradient:
        "linear-gradient(135deg, #D946A6 0%, #FF6B9D 50%, #F43F5E 100%)",
      icon: Zap,
    },
    {
      id: 2,
      badge: "NUEVO",
      title: "Pagos Globales",
      description:
        "Realiza pagos internacionales de forma rápida y segura con las mejores tasas del mercado.",
      buttonText: "Comenzar",
      gradient:
        "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%)",
      icon: Globe,
    },
    {
      id: 3,
      badge: "POPULAR",
      title: "Tarjetas Corporativas",
      description:
        "Emite tarjetas para tu equipo con límites personalizados y control total de gastos.",
      buttonText: "Solicitar",
      gradient:
        "linear-gradient(135deg, #0EA5E9 0%, #06B6D4 50%, #14B8A6 100%)",
      icon: CreditCard,
    },
    {
      id: 4,
      badge: "SEGURO",
      title: "Protección Avanzada",
      description:
        "Mantén tus transacciones seguras con nuestro sistema de encriptación de nivel bancario.",
      buttonText: "Más Información",
      gradient:
        "linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)",
      icon: Shield,
    },
    {
      id: 5,
      badge: "MÓVIL",
      title: "App Inteligente",
      description:
        "Gestiona tus finanzas desde cualquier lugar con nuestra aplicación móvil intuitiva.",
      buttonText: "Descargar",
      gradient:
        "linear-gradient(135deg, #F59E0B 0%, #F97316 50%, #EF4444 100%)",
      icon: Smartphone,
    },
    {
      id: 6,
      badge: "ANALYTICS",
      title: "Reportes en Tiempo Real",
      description:
        "Visualiza el estado de tus finanzas con dashboards interactivos y reportes detallados.",
      buttonText: "Ver Demo",
      gradient:
        "linear-gradient(135deg, #EC4899 0%, #DB2777 50%, #BE185D 100%)",
      icon: TrendingUp,
    },
  ];

  // Renderizar productos de la API como elementos React
  const apiCardElements = apiProducts.map((product) => (
    <div
      key={product.id}
      style={{
        background: product.gradient,
        borderRadius: "24px",
        padding: "48px 40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "white",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
        height: "100%",
      }}
      data-testid={`api-card-${product.id}`}
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "24px",
          }}
        >
          <Zap size={24} />
          <span
            style={{
              fontSize: "14px",
              fontWeight: "600",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            {product.badge}
          </span>
        </div>

        <h2
          style={{
            fontSize: "48px",
            fontWeight: "700",
            marginBottom: "16px",
            lineHeight: "1.2",
          }}
        >
          {product.title}
        </h2>

        <p
          style={{
            fontSize: "18px",
            lineHeight: "1.6",
            opacity: "0.95",
            marginBottom: "32px",
          }}
        >
          {product.description}
        </p>
      </div>

      <button
        style={{
          background: "white",
          color: "#1f2937",
          border: "none",
          borderRadius: "12px",
          padding: "16px 32px",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          alignSelf: "flex-start",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
        data-testid={`button-${product.id}`}
      >
        {product.buttonText}
      </button>
    </div>
  ));

  const cardElements = featuredCards.map((card) => {
    const Icon = card.icon;
    return (
      <div
        key={card.id}
        style={{
          background: card.gradient,
          borderRadius: "24px",
          padding: "48px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          color: "white",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
          height: "100%",
        }}
        data-testid={`card-${card.id}`}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "24px",
            }}
          >
            <Icon size={24} />
            <span
              style={{
                fontSize: "14px",
                fontWeight: "600",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              {card.badge}
            </span>
          </div>

          <h2
            style={{
              fontSize: "48px",
              fontWeight: "700",
              marginBottom: "16px",
              lineHeight: "1.2",
            }}
          >
            {card.title}
          </h2>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.6",
              opacity: "0.95",
              marginBottom: "32px",
            }}
          >
            {card.description}
          </p>
        </div>

        <button
          style={{
            background: "white",
            color: "#1f2937",
            border: "none",
            borderRadius: "12px",
            padding: "16px 32px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            alignSelf: "flex-start",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
          data-testid={`button-explore-${card.id}`}
        >
          {card.buttonText}
        </button>
      </div>
    );
  });

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "48px", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "700",
            marginBottom: "16px",
            color: "#1f2937",
          }}
        >
          Componente Carousel
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "#6b7280",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Carrusel interactivo con autoplay, gestos táctiles, navegación por
          teclado e indicadores clicables.
        </p>
      </div>

      {/* Carousel with API Data */}
      <section style={{ marginBottom: "64px", border: "3px solid #8B5CF6", padding: "24px", borderRadius: "12px", background: "#F5F3FF" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "700",
            marginBottom: "8px",
            color: "#5B21B6",
          }}
        >
          🔄 Carousel con Datos de API (Asíncrono)
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "#5B21B6",
            marginBottom: "16px",
            fontWeight: "600",
          }}
        >
          Los datos se cargan de forma asíncrona desde una API simulada. Observa los estados de loading y error.
        </p>

        {isLoadingAPI ? (
          <div
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "24px",
              padding: "80px 40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              minHeight: "450px",
            }}
            data-testid="loading-state"
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                border: "4px solid rgba(255, 255, 255, 0.3)",
                borderTop: "4px solid white",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                marginBottom: "24px",
              }}
            />
            <h3 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "8px" }}>
              Cargando productos...
            </h3>
            <p style={{ fontSize: "16px", opacity: "0.9" }}>
              Obteniendo datos de la API
            </p>
          </div>
        ) : apiError ? (
          <div
            style={{
              background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
              borderRadius: "24px",
              padding: "80px 40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              minHeight: "450px",
            }}
            data-testid="error-state"
          >
            <h3 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "8px" }}>
              ❌ Error al cargar
            </h3>
            <p style={{ fontSize: "16px", opacity: "0.9" }}>
              {apiError}
            </p>
          </div>
        ) : (
          <Carousel
            items={apiCardElements}
            autoPlay={true}
            autoPlayIntervalMs={3000}
            pauseOnHover={true}
            draggable={true}
            showIndicators={true}
            indicatorsClickable={true}
            itemHeight="450px"
            loop={true}
            id="carousel-api"
          />
        )}
      </section>

      {/* Basic Carousel with Autoplay */}
      <section style={{ marginBottom: "64px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "24px",
            color: "#374151",
          }}
        >
          Autoplay + Draggable (Pausar en Hover)
        </h2>
        <Carousel
          items={cardElements}
          autoPlay={true}
          autoPlayIntervalMs={3000}
          pauseOnHover={true}
          draggable={true}
          showIndicators={true}
          indicatorsClickable={true}
          itemHeight="450px"
          loop={true}
          keyboard={true}
          id="carousel-autoplay"
        />
      </section>

      {/* Carousel with onReachStart and onReachEnd callbacks */}
      <section style={{ marginBottom: "64px", border: "3px solid #F59E0B", padding: "24px", borderRadius: "12px", background: "#FEF3C7" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "700",
            marginBottom: "8px",
            color: "#92400E",
          }}
        >
          🎯 Callbacks onReachStart & onReachEnd
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "#92400E",
            marginBottom: "16px",
            fontWeight: "600",
          }}
        >
          Este carousel SIN LOOP dispara callbacks cuando llegas al inicio o al final
        </p>
        
        {reachedMessage && (
          <div
            style={{
              padding: "12px 20px",
              background: "#10B981",
              color: "white",
              borderRadius: "8px",
              marginBottom: "16px",
              fontSize: "16px",
              fontWeight: "600",
              textAlign: "center",
              animation: "fadeIn 0.3s ease",
            }}
            data-testid="text-reached-message"
          >
            {reachedMessage}
          </div>
        )}

        <Carousel
          items={cardElements}
          loop={false}
          draggable={true}
          showIndicators={true}
          indicatorsClickable={true}
          itemHeight="450px"
          onReachStart={() => {
            setReachedMessage("🎉 ¡Llegaste al INICIO del carousel!");
            setTimeout(() => setReachedMessage(""), 2000);
          }}
          onReachEnd={() => {
            setReachedMessage("🏁 ¡Llegaste al FINAL del carousel!");
            setTimeout(() => setReachedMessage(""), 2000);
          }}
          id="carousel-callbacks"
        />
      </section>

      {/* Controlled Carousel */}
      <section style={{ marginBottom: "64px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "16px",
            color: "#374151",
          }}
        >
          Carrusel Controlado
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "#6b7280",
            marginBottom: "24px",
          }}
        >
          Control externo del índice actual:{" "}
          <strong>
            Slide {controlledIndex + 1} de {cardElements.length}
          </strong>
        </p>

        <div
          style={{
            display: "flex",
            gap: "8px",
            marginBottom: "24px",
            flexWrap: "wrap",
          }}
        >
          {cardElements.map((_, index) => (
            <button
              key={index}
              onClick={() => setControlledIndex(index)}
              style={{
                padding: "8px 16px",
                background: controlledIndex === index ? "#6366f1" : "#e5e7eb",
                color: controlledIndex === index ? "white" : "#374151",
                border: "none",
                borderRadius: "8px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              data-testid={`button-goto-${index}`}
            >
              Slide {index + 1}
            </button>
          ))}
        </div>

        <Carousel
          items={cardElements}
          currentIndex={controlledIndex}
          onChange={(index) => setControlledIndex(index)}
          autoPlay={true}
          autoPlayIntervalMs={4000}
          draggable={true}
          showIndicators={true}
          indicatorsClickable={true}
          itemHeight="450px"
          loop={true}
          id="carousel-controlled"
        />
      </section>

      {/* Multi-slide view */}
      <section style={{ marginBottom: "64px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "24px",
            color: "#374151",
          }}
        >
          Múltiples Slides Visibles (2 slides + espacio)
        </h2>
        <Carousel
          items={cardElements}
          slidesPerView={2}
          spaceBetweenPx={24}
          draggable={true}
          showIndicators={true}
          indicatorsClickable={true}
          itemHeight="400px"
          loop={true}
          id="carousel-multi"
        />
      </section>

      {/* No loop - PRIMER SLIDE */}
      <section style={{ marginBottom: "48px", border: "3px solid #3B82F6", padding: "24px", borderRadius: "12px", background: "#EFF6FF" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px", color: "#1E40AF" }}>
          ✅ Sin Loop - Inicia en PRIMER Slide
        </h2>
        <p style={{ fontSize: "14px", color: "#1E40AF", marginBottom: "16px", fontWeight: "600" }}>
          DEBE mostrar solo el botón derecho (→) porque estás en el inicio<br/>
          ❌ Botón izquierdo (←) debe estar OCULTO
        </p>
        <Carousel
          items={cardElements}
          loop={false}
          initialIndex={0}
          draggable={true}
          showIndicators={true}
          indicatorsClickable={true}
          itemHeight="450px"
          id="carousel-no-loop-first"
        />
      </section>

      {/* No loop - ÚLTIMO SLIDE */}
      <section style={{ marginBottom: "64px", border: "3px solid #10B981", padding: "24px", borderRadius: "12px", background: "#ECFDF5" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px", color: "#047857" }}>
          ✅ Sin Loop - Inicia en ÚLTIMO Slide
        </h2>
        <p style={{ fontSize: "14px", color: "#047857", marginBottom: "16px", fontWeight: "600" }}>
          DEBE mostrar solo el botón izquierdo (←) porque estás en el final<br/>
          ❌ Botón derecho (→) debe estar OCULTO
        </p>
        <Carousel
          items={cardElements}
          loop={false}
          initialIndex={5}
          draggable={true}
          showIndicators={true}
          indicatorsClickable={true}
          itemHeight="450px"
          id="carousel-no-loop-last"
        />
      </section>

      {/* Minimal carousel */}
      <section style={{ marginBottom: "64px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "24px",
            color: "#374151",
          }}
        >
          Minimalista (Sin Indicadores, Solo Gestos)
        </h2>
        <Carousel
          items={cardElements.slice(0, 3)}
          showIndicators={false}
          draggable={true}
          itemHeight="450px"
          id="carousel-minimal"
        />
      </section>

      {/* Peek effect */}
      <section style={{ marginBottom: "64px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "24px",
            color: "#374151",
          }}
        >
          Efecto Peek (Vista Previa de Slides Adyacentes)
        </h2>
        <p
          style={{
            fontSize: "14px",
            color: "#6b7280",
            marginBottom: "24px",
          }}
        >
          Los slides se muestran al 80% del ancho para revelar aproximadamente
          un 10% de las tarjetas adyacentes. Los botones de navegación se
          ocultan automáticamente para una experiencia más limpia.
        </p>
        <Carousel
          items={cardElements}
          autoPlay={true}
          autoPlayIntervalMs={3500}
          pauseOnHover={true}
          draggable={true}
          showIndicators={true}
          indicatorsClickable={true}
          itemHeight="450px"
          loop={true}
          id="carousel-peek"
        />
      </section>

      {/* Without navigation buttons */}
      <section>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "24px",
            color: "#374151",
          }}
        >
          Sin Botones de Navegación
        </h2>
        <Carousel
          items={cardElements.slice(0, 4)}
          showNavigationButtons={false}
          showIndicators={true}
          indicatorsClickable={true}
          draggable={true}
          itemHeight="450px"
          id="carousel-no-buttons"
        />
      </section>
    </div>
  );
};

export default CarouselDemo;
