const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcryptjs");

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
);

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const { method } = req;
  const { email, password } = req.body || {};

  try {
    if (method === "POST") {
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
      }

      // Check if user exists
      const { data: existingUser, error: checkError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      // LOGIN LOGIC
      if (existingUser) {
        const isPasswordValid = await bcrypt.compare(
          password,
          existingUser.password,
        );
        if (!isPasswordValid) {
          return res.status(401).json({ error: "Invalid password" });
        }
        const { password: _, ...userWithoutPassword } = existingUser;
        return res
          .status(200)
          .json({ message: "User logged in", user: userWithoutPassword });
      }

      // REGISTER LOGIC
      const hashedPassword = await bcrypt.hash(password, 10);
      const { data: newUser, error: createError } = await supabase
        .from("users")
        .insert([{ ...req.body, password: hashedPassword }])
        .select()
        .single();

      if (createError) throw createError;
      const { password: __, ...userWithoutPassword } = newUser;
      return res
        .status(201)
        .json({ message: "User created", user: userWithoutPassword });
    }

    if (method === "GET") {
      const { data: users, error } = await supabase
        .from("users")
        .select("id, name, email, dob, created_at, updated_at");
      if (error) throw error;
      return res.status(200).json(users);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
