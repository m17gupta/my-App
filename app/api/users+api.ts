import { supabase } from "@/utils/supabase";
import bcrypt from "bcryptjs";

/* ===========================
   GET
=========================== */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const { data: user, error } = await supabase
        .from("users")
        .select("id, name, email, dob, created_at, updated_at")
        .eq("id", id)
        .single();

      if (error || !user)
        return Response.json({ error: "User not found" }, { status: 404 });

      return Response.json(user);
    }

    const { data: users, error } = await supabase
      .from("users")
      .select("id, name, email, dob, created_at, updated_at");

    if (error) throw error;

    return Response.json(users);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

/* ===========================
   POST (Register / Login)
=========================== */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, ...rest } = body;

    if (!email || !password) {
      return Response.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    // Check if user exists (Manual Login Logic)
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    // LOGIN
    if (existingUser) {
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordValid) {
        return Response.json({ error: "Invalid password" }, { status: 401 });
      }

      const { password: _, ...userWithoutPassword } = existingUser;

      return Response.json(
        { message: "User logged in", user: userWithoutPassword },
        { status: 200 }
      );
    }

    // REGISTER
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: newUser, error: createError } = await supabase
      .from("users")
      .insert([
        {
          ...rest,
          email,
          password: hashedPassword,
        },
      ])
      .select()
      .single();

    if (createError) throw createError;

    const { password: __, ...userWithoutPassword } = newUser;

    return Response.json(
      { message: "User created", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

/* ===========================
   PUT
=========================== */
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return Response.json({ error: "ID is required" }, { status: 400 });
    }

    const { data: user, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", id)
      .select("id, name, email, dob, created_at, updated_at")
      .single();

    if (error || !user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({ message: "User updated", user });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

/* ===========================
   DELETE
=========================== */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({ error: "ID is required" }, { status: 400 });
    }

    const { error } = await supabase.from("users").delete().eq("id", id);

    if (error) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({ message: "User deleted" });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}