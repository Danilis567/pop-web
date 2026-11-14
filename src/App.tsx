export default function App() {
  return (
    <main
      style={{
        minHeight: '100svh',
        display: 'grid',
        placeItems: 'center',
        background: '#FFFFFF',
        margin: 0,
        overflow: 'hidden',
      }}
    >
      <img
        src="/images/center.jpg"
        alt="Referans görsel"
        style={{
          objectFit: 'contain',
          maxWidth: '100%',
          maxHeight: '100svh',
          display: 'block',
        }}
      />
    </main>
  );
}
