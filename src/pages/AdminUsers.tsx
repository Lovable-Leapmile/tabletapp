import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar } from "@/components/AppBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Search, X, Users } from "lucide-react";
import { getApiUrl } from "@/utils/api";

interface User {
  user_name: string;
  user_role: string;
  user_phone: string;
}

const AdminUsers = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username") || "Guest";
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const authToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2wiOiJhZG1pbiIsImV4cCI6MTkwNzIyMTMyOX0.yl2G3oNWNgXXyCyCLnj8IW0VZ2TezllqSdnhSyLg9NQ";

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      console.log("Fetching users from API...");
      const response = await fetch(getApiUrl('/user/users'), {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
      });

      console.log("API Response Status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response Data:", data);
      console.log("Data type:", typeof data);
      console.log("Is array?", Array.isArray(data));
      
      // Ensure data is an array
      if (Array.isArray(data)) {
        setUsers(data);
        setFilteredUsers(data);
      } else {
        console.warn("API returned non-array data:", data);
        // If data is not an array, try to extract array from response
        if (data && typeof data === 'object') {
          const possibleArrays = Object.values(data).filter(Array.isArray);
          if (possibleArrays.length > 0) {
            console.log("Found array in response:", possibleArrays[0]);
            setUsers(possibleArrays[0]);
            setFilteredUsers(possibleArrays[0]);
          } else {
            throw new Error("API response does not contain user array");
          }
        } else {
          throw new Error("API response is not in expected format");
        }
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch users');
      
      // Set mock data as fallback
      const mockUsers = [
        { user_name: "John Doe", user_role: "admin", user_phone: "1234567890" },
        { user_name: "Jane Smith", user_role: "inbound", user_phone: "0987654321" },
        { user_name: "Bob Wilson", user_role: "picking", user_phone: "5555555555" },
      ];
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.user_phone.includes(searchTerm) ||
      user.user_role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);


  return (
    <div className="min-h-screen bg-background mobile-app-bar-padding">
      <AppBar title="Users" showBack username={username} />

      {/* Fixed White Div with Search and Stats */}
      <div
        className="fixed left-0 right-0 bg-card border-b border-border z-40 shadow-sm -mt-[6px]"
        style={{
          top: `calc(var(--app-bar-height, 122px) + env(safe-area-inset-top))`,
        }}>
        <div className="container mx-auto mobile-content-padding py-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-row items-center gap-2 sm:gap-4 flex-wrap">
              {/* Search Input */}
              <div className="relative flex-1 min-w-[200px]">
                <div className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                </div>
                <Input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search users..."
                  className="h-10 sm:h-12 pl-8 sm:pl-10 pr-8 sm:pr-10 text-sm sm:text-base w-full"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                )}
              </div>
              
              {/* Total Users Label */}
              <div className="text-sm sm:text-lg font-medium text-foreground whitespace-nowrap flex-shrink-0">
                Total Users: <span className="text-icon-accent">{filteredUsers.length > 0 ? filteredUsers.length : users.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Users List */}
      <div className="pt-[4.5rem]">
        <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="max-w-6xl mx-auto">
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center space-y-4">
                  <div className="animate-spin h-12 w-12 border-4 border-accent border-t-transparent rounded-full mx-auto"></div>
                  <p className="text-lg text-muted-foreground">Loading users...</p>
                </div>
              </div>
            ) : error ? (
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-4xl">⚠️</span>
                </div>
                <h2 className="text-2xl font-semibold text-destructive">API Error</h2>
                <p className="text-muted-foreground">{error}</p>
                <p className="text-sm text-muted-foreground">Showing mock data instead</p>
                <button 
                  onClick={fetchUsers}
                  className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90"
                >
                  Retry
                </button>
              </div>
            ) : filteredUsers.length > 0 ? (
              <div className="space-y-4">
                {Array.isArray(filteredUsers) && filteredUsers.map((user) => (
                  <div key={user.user_phone} className="p-4 sm:p-6 border border-border rounded-lg bg-card w-full">
                     <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">{user.user_name}</h3>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">
                            Role: <span className="font-medium text-foreground capitalize">{user.user_role}</span>
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Phone: <span className="font-medium text-foreground">{user.user_phone}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Users className="h-8 w-8 text-muted-foreground" />
                  <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">
                    No Users Found
                  </h2>
                </div>
                <p className="text-lg text-muted-foreground max-w-md mx-auto">
                  {searchTerm ? 'No users match your search criteria.' : 'No users available in the system.'}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

    </div>
  );
};

export default AdminUsers;
