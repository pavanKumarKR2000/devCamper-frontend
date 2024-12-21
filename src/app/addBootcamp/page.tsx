"use client";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/TextArea";
import { schema } from "@/schemas/bootcamp";
import { zodResolver } from "@hookform/resolvers/zod";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateBootcamp } from "@/api/bootcamp";
import { toast, useToast } from "@/hooks/useToast";
import { DevTool } from "@hookform/devtools";
import { TOAST_TIMEOUT } from "@/constants";
import BootcampCard from "@/components/bootcamp/BootcampCard";
import BootcampForm from "@/components/bootcamp/BootcampForm";

const page = () => {
  return (
    <main>
      <div className="container mx-auto py-10 flex items-center justify-center min-h-screen">
        <BootcampForm />
      </div>
    </main>
  );
};

export default page;
