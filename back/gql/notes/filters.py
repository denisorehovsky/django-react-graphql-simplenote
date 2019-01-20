from django.db.models import Q
import django_filters
from notes.models import Note


class NoteFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method='filter_search')

    class Meta:
        model = Note
        fields = ()

    def filter_search(self, queryset, name, value):
        return queryset.filter(
            Q(title__icontains=value) | Q(body__icontains=value)
        )
