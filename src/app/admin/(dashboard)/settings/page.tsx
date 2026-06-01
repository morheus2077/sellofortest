'use client'

import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, User, Lock, Bell, Shield, CreditCard, LogOut } from 'lucide-react'

export default function SettingsPage() {
  const router = useRouter()

  const settingsMenu = [
    {
      title: 'Profile',
      description: 'Manage your personal information and preferences',
      icon: User,
      href: '/admin/settings/profile',
    },
    {
      title: 'Security',
      description: 'Change password and manage your account security',
      icon: Lock,
      href: '/admin/settings/security',
    },
    {
      title: 'Notifications',
      description: 'Manage notification preferences and alerts',
      icon: Bell,
      href: '/admin/settings/communication',
    },
    {
      title: 'Permissions',
      description: 'Control access levels and user permissions',
      icon: Shield,
      href: '/admin/settings/permissions',
    },
    {
      title: 'Billing',
      description: 'View and manage your billing information',
      icon: CreditCard,
      href: '#',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {settingsMenu.map((setting) => {
          const Icon = setting.icon
          return (
            <Card
              key={setting.title}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => router.push(setting.href)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{setting.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {setting.description}
                      </CardDescription>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardHeader>
            </Card>
          )
        })}
      </div>

      <Card className="bg-destructive/5 border-destructive/20">
        <CardHeader>
          <CardTitle className="text-lg">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" className="gap-2">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
