from django.db import models
from django.utils.translation import ugettext_lazy as _


class Note(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('note')
        verbose_name_plural = _('notes')
        ordering = ('-created_at', )

    def __str__(self):
        return '{} (#{})'.format(self.title, self.pk)
