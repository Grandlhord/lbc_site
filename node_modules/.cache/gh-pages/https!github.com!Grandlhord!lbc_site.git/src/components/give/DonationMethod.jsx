"use client"

import React from "react"
import { Smartphone, CreditCard, Banknote, Phone, Copy, Check, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

const DonationMethods = ({ className = "", textClassName = "" }) => {
  const [copiedText, setCopiedText] = React.useState(null)

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopiedText(text)
    setTimeout(() => setCopiedText(null), 2000)
  }

  const DonationCard = ({
    icon: Icon,
    iconColor,
    title,
    subtitle,
    methods,
    bgColor,
    textColor,
    gradientFrom,
    gradientTo,
  }) => (
    <motion.div
      className="relative group mt-24"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div
        className={`bg-black/60 backdrop-blur-md w-full sm:w-80 md:w-96 rounded-2xl shadow-2xl 
        hover:shadow-2xl transform transition-all duration-500 hover:scale-[1.02] relative overflow-hidden 
        border border-white/10 hover:border-white/20 ${className}`}
      >
        {/* Gradient accent */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${gradientFrom} ${gradientTo}`}></div>

        {/* Glare effect */}
        <div
          className="absolute -top-40 -left-40 w-80 h-80 bg-white opacity-0 group-hover:opacity-5 
          rotate-45 transform translate-x-0 group-hover:translate-x-full translate-y-0 group-hover:translate-y-full transition-all duration-1000 ease-out"
        ></div>

        <div className="p-8 text-center relative z-10">
          <div
            className={`w-16 h-16 mx-auto mb-6 rounded-full ${bgColor} bg-opacity-20 flex items-center justify-center`}
          >
            <Icon className={`${iconColor}`} size={32} />
          </div>

          <h3 className={`text-xl font-bold mb-6 ${textClassName}`}>{title}</h3>

          <div className="space-y-4">
            {methods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm p-5 rounded-xl shadow-inner border border-white/10 
                  hover:border-white/20 transition-all group/method"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <method.icon className={method.iconColor} size={20} />
                  <h4 className={`text-base font-semibold ${method.titleColor}`}>{method.name}</h4>
                </div>

                <div className="space-y-2">
                  {method.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">{detail.label}:</p>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white">{detail.value}</span>
                        <button
                          onClick={() => copyToClipboard(detail.value)}
                          className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                          title="Copy to clipboard"
                        >
                          {copiedText === detail.value ? (
                            <Check size={14} className="text-green-400" />
                          ) : (
                            <Copy size={14} />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Highlight Section */}
          <div
            className={`${bgColor} ${textColor} p-4 mt-6 rounded-xl bg-opacity-10 border border-${textColor.replace("text-", "")}/20`}
          >
            <p className="text-sm">{subtitle}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )

  const mobileMethods = [
    {
      icon: Phone,
      iconColor: "text-yellow-500",
      name: "MTN Mobile Money",
      titleColor: "text-yellow-500",
      details: [
        { label: "Momo Pay ID", value: "276822" },
        { label: "Phone", value: "024 237 1411" },
      ],
    },
    {
      icon: Phone,
      iconColor: "text-purple-500",
      name: "Telecel Cash",
      titleColor: "text-purple-500",
      details: [{ label: "Phone", value: "050 658 7666" }],
    },
  ]

  const bankMethods = [
    {
      icon: Banknote,
      iconColor: "text-blue-400",
      name: "USD Account",
      titleColor: "text-blue-400",
      details: [
        { label: "Bank", value: "ECOBANK" },
        { label: "Account", value: "3441002209588" },
      ],
    },
    {
      icon: Banknote,
      iconColor: "text-green-400",
      name: "Ghana Cedis Account",
      titleColor: "text-green-400",
      details: [
        { label: "Bank", value: "ECOBANK" },
        { label: "Account", value: "1441000860595" },
      ],
    },
  ]

  return (
    <div className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <DonationCard
            icon={Smartphone}
            iconColor="text-green-500"
            title="Mobile Money"
            subtitle="Choose your preferred mobile money platform and send your donation."
            methods={mobileMethods}
            bgColor="bg-green-700"
            textColor="text-green-300"
            gradientFrom="from-green-600"
            gradientTo="to-green-400"
          />

          <DonationCard
            icon={CreditCard}
            iconColor="text-blue-500"
            title="Bank Transfer"
            subtitle="Direct bank transfers are welcome. Choose USD or Ghana Cedis account."
            methods={bankMethods}
            bgColor="bg-blue-700"
            textColor="text-blue-300"
            gradientFrom="from-blue-600"
            gradientTo="to-blue-400"
          />
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className={`text-base max-w-lg mx-auto ${textClassName} mb-4`}>
            Your generosity makes a difference. Every donation, big or small, helps us continue our mission.
          </p>
          <a
            href="#"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors gap-1 text-sm"
          >
            <span>Learn more about how we use donations</span>
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default DonationMethods

