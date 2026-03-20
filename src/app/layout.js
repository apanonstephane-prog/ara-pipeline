import './globals.css'

export const metadata = {
  title: 'AṚA — Pipeline Visuel',
  description: 'Chroniques des Survivants — Production visuelle Livre I',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
