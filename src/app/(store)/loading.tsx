import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function StoreLoading() {
  return (
    <section className="py-16">
      <Container>
        <Skeleton className="h-10 w-48 mb-3" />
        <Skeleton className="h-5 w-96 max-w-full mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-[4/3] w-full rounded-xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-5 w-20" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
