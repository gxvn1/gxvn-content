export default function Home() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to Gxvn&apos;s Content</h1>
        <p className="text-xl text-gray-600">Explore the latest content and join the conversation</p>
      </section>
      
      <section className="grid gap-6" id="content">
        {/* Content will be dynamically loaded here */}
      </section>
    </div>
  )
}
