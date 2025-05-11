import AdminLayout from "@/components/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function AddTeamMemberPage() {
  return (
    <AdminLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Add Team Member</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Team Member Details</CardTitle>
            <CardDescription>Fill in the information below to add a new team member</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Enter first name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Enter last name" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" placeholder="e.g. Lead Designer" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Write a short bio..." className="min-h-32" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo">Profile Photo</Label>
                <div className="flex items-center gap-4">
                  <Input id="photo" type="file" className="w-full" />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Social Media Links</Label>

                <div className="space-y-2">
                  <Label htmlFor="twitter" className="text-sm">
                    Twitter
                  </Label>
                  <Input id="twitter" placeholder="https://twitter.com/username" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-sm">
                    LinkedIn
                  </Label>
                  <Input id="linkedin" placeholder="https://linkedin.com/in/username" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github" className="text-sm">
                    GitHub
                  </Label>
                  <Input id="github" placeholder="https://github.com/username" />
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button>Add Team Member</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
