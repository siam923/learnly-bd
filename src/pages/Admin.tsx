import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, BookOpen, FolderOpen, FileText } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [chapters, setChapters] = useState<any[]>([]);

  useEffect(() => {
    checkAdminAccess();
    fetchData();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .single();

      if (error || data?.role !== "admin") {
        toast.error("Admin access required");
        navigate("/dashboard");
        return;
      }

      setIsAdmin(true);
    } catch (error) {
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
      const [classesRes, subjectsRes, chaptersRes] = await Promise.all([
        supabase.from("classes").select("*").order("order_index"),
        supabase.from("subjects").select("*").order("order_index"),
        supabase.from("chapters").select("*").order("order_index"),
      ]);

      if (classesRes.data) setClasses(classesRes.data);
      if (subjectsRes.data) setSubjects(subjectsRes.data);
      if (chaptersRes.data) setChapters(chaptersRes.data);
    } catch (error) {
      toast.error("Failed to load data");
    }
  };

  const handleCreateClass = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const { error } = await supabase.from("classes").insert({
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        order_index: classes.length,
      });

      if (error) throw error;
      toast.success("Class created successfully");
      e.currentTarget.reset();
      fetchData();
    } catch (error: any) {
      toast.error(error.message || "Failed to create class");
    }
  };

  const handleCreateSubject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const { error } = await supabase.from("subjects").insert({
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        class_id: formData.get("class_id") as string,
        icon: formData.get("icon") as string,
        color: formData.get("color") as string,
        order_index: subjects.length,
      });

      if (error) throw error;
      toast.success("Subject created successfully");
      e.currentTarget.reset();
      fetchData();
    } catch (error: any) {
      toast.error(error.message || "Failed to create subject");
    }
  };

  const handleCreateChapter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const { error } = await supabase.from("chapters").insert({
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        subject_id: formData.get("subject_id") as string,
        is_free_preview: formData.get("is_free_preview") === "on",
        order_index: chapters.length,
      });

      if (error) throw error;
      toast.success("Chapter created successfully");
      e.currentTarget.reset();
      fetchData();
    } catch (error: any) {
      toast.error(error.message || "Failed to create chapter");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-6xl py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            ← Back to Dashboard
          </Button>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-3xl">Admin Panel</CardTitle>
            <CardDescription>Manage classes, subjects, chapters, and lessons</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="classes">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="classes">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Classes
                </TabsTrigger>
                <TabsTrigger value="subjects">
                  <FolderOpen className="w-4 h-4 mr-2" />
                  Subjects
                </TabsTrigger>
                <TabsTrigger value="chapters">
                  <FileText className="w-4 h-4 mr-2" />
                  Chapters
                </TabsTrigger>
              </TabsList>

              <TabsContent value="classes" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Class</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCreateClass} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="class-title">Title</Label>
                        <Input id="class-title" name="title" required placeholder="e.g., Class 10" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="class-description">Description</Label>
                        <Textarea id="class-description" name="description" placeholder="Brief description" />
                      </div>
                      <Button type="submit">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Class
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="subjects" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Subject</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCreateSubject} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="subject-class">Class</Label>
                        <Select name="class_id" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a class" />
                          </SelectTrigger>
                          <SelectContent>
                            {classes.map((cls) => (
                              <SelectItem key={cls.id} value={cls.id}>
                                {cls.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject-title">Title</Label>
                        <Input id="subject-title" name="title" required placeholder="e.g., Mathematics" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject-icon">Icon Emoji</Label>
                        <Input id="subject-icon" name="icon" defaultValue="📚" placeholder="📚" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject-color">Color Gradient</Label>
                        <Input id="subject-color" name="color" defaultValue="from-blue-500 to-purple-600" placeholder="from-blue-500 to-purple-600" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject-description">Description</Label>
                        <Textarea id="subject-description" name="description" placeholder="Brief description" />
                      </div>
                      <Button type="submit">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Subject
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="chapters" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Chapter</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCreateChapter} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="chapter-subject">Subject</Label>
                        <Select name="subject_id" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjects.map((subject) => (
                              <SelectItem key={subject.id} value={subject.id}>
                                {subject.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="chapter-title">Title</Label>
                        <Input id="chapter-title" name="title" required placeholder="e.g., Introduction to Algebra" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="chapter-description">Description</Label>
                        <Textarea id="chapter-description" name="description" placeholder="Brief description" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="is-free" name="is_free_preview" className="rounded border-input" />
                        <Label htmlFor="is-free" className="cursor-pointer">Free Preview Chapter</Label>
                      </div>
                      <Button type="submit">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Chapter
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
