import { Card, CardHeader, CardContent } from "@/components/ui/card"  // Ensure Card component from Shadcn UI
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export const Sponsors = () => {
  return (
    <div>
      <div>
        <div className="container px-4 py-12 md:py-24">
          <div className="space-y-3 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Sponsors</h1>
            <p className="mx-auto max-w-3xl text-gray-500 md:text-xl/relaxed dark:text-gray-400">
              Thank you to everyone who funds and supports Brown Space Engineering.
            </p>
          </div>
        </div>
      </div>
      <div className="container px-4 pb-12 md:pb-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Sponsor Card 1 */}
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 300 }
            }}
            className="flex w-full items-center justify-center"
          >
            <Card className="w-full max-w-xs border border-gray-200 bg-white shadow-lg rounded-lg overflow-hidden transition-colors hover:z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:border-gray-800 dark:bg-gray-950 dark:hover:z-10 dark:focus-visible:ring-gray-300">
              <CardHeader className="flex justify-center py-4 bg-gray-100 dark:bg-gray-900">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Company Name</h2>
              </CardHeader>
              <CardContent className="flex justify-center p-6">
                <img
                  src="/placeholder.svg"
                  width="200"
                  height="50"
                  alt="Sponsor"
                  className="object-contain object-center"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Sponsor Card 2 */}
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 300 }
            }}
            className="flex w-full items-center justify-center"
          >
            <Card className="w-full max-w-xs border border-gray-200 bg-white shadow-lg rounded-lg overflow-hidden transition-colors hover:z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:border-gray-800 dark:bg-gray-950 dark:hover:z-10 dark:focus-visible:ring-gray-300">
              <CardHeader className="flex justify-center py-4 bg-gray-100 dark:bg-gray-900">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Company Name</h2>
              </CardHeader>
              <CardContent className="flex justify-center p-6">
                <img
                  src="/placeholder.svg"
                  width="200"
                  height="50"
                  alt="Sponsor"
                  className="object-contain object-center"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Sponsor Card 3 */}
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 300 }
            }}
            className="flex w-full items-center justify-center"
          >
            <Card className="w-full max-w-xs border border-gray-200 bg-white shadow-lg rounded-lg overflow-hidden transition-colors hover:z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:border-gray-800 dark:bg-gray-950 dark:hover:z-10 dark:focus-visible:ring-gray-300">
              <CardHeader className="flex justify-center py-4 bg-gray-100 dark:bg-gray-900">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Company Name</h2>
              </CardHeader>
              <CardContent className="flex justify-center p-6">
                <img
                  src="/placeholder.svg"
                  width="200"
                  height="50"
                  alt="Sponsor"
                  className="object-contain object-center"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Sponsor Card 4 */}
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 300 }
            }}
            className="flex w-full items-center justify-center"
          >
            <Card className="w-full max-w-xs border border-gray-200 bg-white shadow-lg rounded-lg overflow-hidden transition-colors hover:z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:border-gray-800 dark:bg-gray-950 dark:hover:z-10 dark:focus-visible:ring-gray-300">
              <CardHeader className="flex justify-center py-4 bg-gray-100 dark:bg-gray-900">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Company Name</h2>
              </CardHeader>
              <CardContent className="flex justify-center p-6">
                <img
                  src="/placeholder.svg"
                  width="200"
                  height="50"
                  alt="Sponsor"
                  className="object-contain object-center"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Sponsor Card 5 */}
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 300 }
            }}
            className="flex w-full items-center justify-center"
          >
            <Card className="w-full max-w-xs border border-gray-200 bg-white shadow-lg rounded-lg overflow-hidden transition-colors hover:z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:border-gray-800 dark:bg-gray-950 dark:hover:z-10 dark:focus-visible:ring-gray-300">
              <CardHeader className="flex justify-center py-4 bg-gray-100 dark:bg-gray-900">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Company Name</h2>
              </CardHeader>
              <CardContent className="flex justify-center p-6">
                <img
                  src="/placeholder.svg"
                  width="200"
                  height="50"
                  alt="Sponsor"
                  className="object-contain object-center"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Sponsor Card 6 */}
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 300 }
            }}
            className="flex w-full items-center justify-center"
          >
            <Card className="w-full max-w-xs border border-gray-200 bg-white shadow-lg rounded-lg overflow-hidden transition-colors hover:z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:border-gray-800 dark:bg-gray-950 dark:hover:z-10 dark:focus-visible:ring-gray-300">
              <CardHeader className="flex justify-center py-4 bg-gray-100 dark:bg-gray-900">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Company Name</h2>
              </CardHeader>
              <CardContent className="flex justify-center p-6">
                <img
                  src="/placeholder.svg"
                  width="200"
                  height="50"
                  alt="Sponsor"
                  className="object-contain object-center"
                />
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 300 }
            }}
            className="flex w-full items-center justify-center"
          >
            <Card className="w-full max-w-xs border border-gray-200 bg-white shadow-lg rounded-lg overflow-hidden transition-colors hover:z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:border-gray-800 dark:bg-gray-950 dark:hover:z-10 dark:focus-visible:ring-gray-300">
              <CardHeader className="flex justify-center py-4 bg-gray-100 dark:bg-gray-900">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Company Name</h2>
              </CardHeader>
              <CardContent className="flex justify-center p-6">
                <img
                  src="/placeholder.svg"
                  width="200"
                  height="50"
                  alt="Sponsor"
                  className="object-contain object-center"
                />
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            whileHover={{
              scale: 1.05,
              transition: { type: "spring", stiffness: 300 }
            }}
            className="flex w-full items-center justify-center"
          >
            <Card className="w-full max-w-xs border border-gray-200 bg-white shadow-lg rounded-lg overflow-hidden transition-colors hover:z-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:border-gray-800 dark:bg-gray-950 dark:hover:z-10 dark:focus-visible:ring-gray-300">
              <CardHeader className="flex justify-center py-4 bg-gray-100 dark:bg-gray-900">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Company Name</h2>
              </CardHeader>
              <CardContent className="flex justify-center p-6">
                <img
                  src="/placeholder.svg"
                  width="200"
                  height="50"
                  alt="Sponsor"
                  className="object-contain object-center"
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <div className="flex justify-center mt-16">
          <Button variant="outline" size="sm">
            Sponsor Us
          </Button>
        </div>
      </div>
    </div>
  )
}
