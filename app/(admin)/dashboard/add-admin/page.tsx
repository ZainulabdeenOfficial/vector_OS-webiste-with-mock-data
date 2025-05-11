import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export default function AddAdminPage() {
  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Add New Admin</h2>
        </div>

        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle>Admin Account Details</CardTitle>
            <CardDescription>Create a new admin account with specific permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="password">Temporary Password</Label>
                  <Input id="password" type="password" />
                  <p className="text-xs text-muted-foreground mt-1">
                    The admin will be required to change this on first login
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Admin Role</Label>
                  <Select defaultValue="editor">
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="super">Super Admin</SelectItem>
                      <SelectItem value="editor">Content Editor</SelectItem>
                      <SelectItem value="analyst">Analyst</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Permissions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                    <div>
                      <h4 className="font-medium">Content Management</h4>
                      <p className="text-sm text-muted-foreground">Can create and edit all content</p>
                    </div>
                    <Switch defaultChecked id="content-permission" />
                  </div>

                  <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                    <div>
                      <h4 className="font-medium">User Management</h4>
                      <p className="text-sm text-muted-foreground">Can manage user accounts</p>
                    </div>
                    <Switch id="user-permission" />
                  </div>

                  <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                    <div>
                      <h4 className="font-medium">Admin Management</h4>
                      <p className="text-sm text-muted-foreground">Can add and manage other admins</p>
                    </div>
                    <Switch id="admin-permission" />
                  </div>

                  <div className="flex items-center justify-between space-x-2 rounded-md border p-4">
                    <div>
                      <h4 className="font-medium">Analytics Access</h4>
                      <p className="text-sm text-muted-foreground">Can view analytics and reports</p>
                    </div>
                    <Switch defaultChecked id="analytics-permission" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button className="px-8">Create Admin</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
