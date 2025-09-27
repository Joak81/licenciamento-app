"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [stats, setStats] = useState({
    total: 284,
    active: 150,
    expiring: 25,
    expired: 109,
    monthlyValue: 0
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Sistema de Gestão de Licenciamento
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button>
                Novo Licenciamento
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Licenças</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">Todas as licenças cadastradas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Licenças Ativas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
              <p className="text-xs text-muted-foreground">Em vigência</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">A Expirar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.expiring}</div>
              <p className="text-xs text-muted-foreground">Próximos 30 dias</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expiradas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.expired}</div>
              <p className="text-xs text-muted-foreground">Necessitam renovação</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€45.7K</div>
              <p className="text-xs text-muted-foreground">Total mensal com IVA</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Pesquisar licenciamentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                Importar Excel
              </Button>
              <Button variant="outline">
                Relatórios
              </Button>
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Alertas Recentes</CardTitle>
            <CardDescription>Licenças que necessitam atenção</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Microsoft Azure - Expira em 15 dias</p>
                  <p className="text-sm text-gray-600">Valor mensal: €12,500.00</p>
                </div>
                <Button size="sm">Renovar</Button>
              </div>

              <div className="flex items-center p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Adobe Creative Cloud - Expirado há 3 dias</p>
                  <p className="text-sm text-gray-600">Valor mensal: €3,200.00</p>
                </div>
                <Button size="sm" variant="destructive">Ação Urgente</Button>
              </div>

              <div className="flex items-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Salesforce CRM - Expira em 28 dias</p>
                  <p className="text-sm text-gray-600">Valor mensal: €8,750.00</p>
                </div>
                <Button size="sm">Renovar</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Licenses Table */}
        <Card>
          <CardHeader>
            <CardTitle>Licenciamentos Recentes</CardTitle>
            <CardDescription>Últimas atualizações no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium text-gray-700">Licenciamento</th>
                    <th className="text-left p-2 font-medium text-gray-700">Fornecedor</th>
                    <th className="text-left p-2 font-medium text-gray-700">Estado</th>
                    <th className="text-left p-2 font-medium text-gray-700">Período Fim</th>
                    <th className="text-left p-2 font-medium text-gray-700">Valor Mensal</th>
                    <th className="text-left p-2 font-medium text-gray-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-2">Microsoft Office 365</td>
                    <td className="p-2">Microsoft</td>
                    <td className="p-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Ativo</span>
                    </td>
                    <td className="p-2">31/12/2025</td>
                    <td className="p-2">€5,400.00</td>
                    <td className="p-2">
                      <Button size="sm" variant="ghost">Ver Detalhes</Button>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-2">AWS Cloud Services</td>
                    <td className="p-2">Amazon</td>
                    <td className="p-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Ativo</span>
                    </td>
                    <td className="p-2">15/06/2025</td>
                    <td className="p-2">€18,900.00</td>
                    <td className="p-2">
                      <Button size="sm" variant="ghost">Ver Detalhes</Button>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-2">Slack Business</td>
                    <td className="p-2">Slack Technologies</td>
                    <td className="p-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">A Expirar</span>
                    </td>
                    <td className="p-2">28/01/2025</td>
                    <td className="p-2">€2,100.00</td>
                    <td className="p-2">
                      <Button size="sm" variant="ghost">Ver Detalhes</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
