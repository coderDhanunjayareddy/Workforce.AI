import type { Contact } from "@/types";

import type { ContactFilters } from "../types/contactModule.types";

function scoreBucket(score: number): ContactFilters["leadScore"] {
  if (score >= 85) return "qualified";
  if (score >= 70) return "hot";
  if (score >= 50) return "warm";
  return "cold";
}

function matchesLastContact(contact: Contact, filter: ContactFilters["lastContactDate"]) {
  if (filter === "all" || !contact.lastContact) return true;
  const age = Date.now() - new Date(contact.lastContact).getTime();
  const day = 24 * 60 * 60 * 1000;
  if (filter === "today") return age <= day;
  if (filter === "week") return age <= day * 7;
  return age <= day * 30;
}

export function getFilteredContacts(contacts: Contact[], filters: ContactFilters) {
  const query = filters.search.trim().toLowerCase();
  return contacts.filter((contact) => {
    const searchable = [
      contact.fullName,
      contact.phone,
      contact.email,
      contact.company,
      contact.policyNumber,
      ...(contact.tags ?? [])
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const matchesQuery = !query || searchable.includes(query);
    const matchesStatus = filters.status === "all" || contact.status === filters.status;
    const matchesScore = filters.leadScore === "all" || scoreBucket(contact.leadScore) === filters.leadScore;
    const matchesCampaign = filters.campaign === "all" || contact.currentCampaign === filters.campaign;
    const matchesEmployee = filters.assignedEmployeeId === "all" || contact.assignedEmployeeId === filters.assignedEmployeeId;
    const matchesIndustry = filters.industry === "all" || contact.industry === filters.industry;
    const matchesPolicy = filters.policyType === "all" || contact.policyType === filters.policyType;
    const matchesLocation = filters.location === "all" || contact.city === filters.location || contact.state === filters.location;

    return (
      matchesQuery &&
      matchesStatus &&
      matchesScore &&
      matchesCampaign &&
      matchesEmployee &&
      matchesIndustry &&
      matchesPolicy &&
      matchesLocation &&
      matchesLastContact(contact, filters.lastContactDate)
    );
  });
}
