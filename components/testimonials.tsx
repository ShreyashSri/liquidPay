import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    quote:
      "FinSavvy AI helped me save over ₹50,000 in just 3 months by identifying my impulse spending habits. The real-time nudges are a game-changer!",
    name: "Priya Sharma",
    title: "Marketing Professional",
    avatar: "PS",
  },
  {
    quote:
      "I never realized how much I was spending on food delivery until FinSavvy showed me the data. The gamified savings feature makes it fun to save money.",
    name: "Rahul Patel",
    title: "Software Engineer",
    avatar: "RP",
  },
  {
    quote:
      "As a recent graduate, managing finances was overwhelming. FinSavvy AI made it simple with personalized recommendations that actually work.",
    name: "Ananya Gupta",
    title: "Recent Graduate",
    avatar: "AG",
  },
]

export default function Testimonials() {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">Success Stories</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how FinSavvy AI is helping young adults transform their financial habits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700 shadow-lg">
              <CardContent className="pt-6">
                <div className="relative">
                  <div className="absolute -top-6 -left-2 text-yellow-500 text-6xl opacity-20">"</div>
                  <p className="text-gray-300 relative z-10 mb-6">{testimonial.quote}</p>
                </div>
              </CardContent>
              <CardFooter className="flex items-center space-x-4 border-t border-gray-700 pt-4">
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-br from-yellow-600 to-yellow-400 text-white">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-medium">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.title}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

