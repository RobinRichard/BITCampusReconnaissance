from django.contrib import admin


from .models import Role,User,Status,Type,Category,Section,Question,Reconnaissance,Gallery,UserStatus

admin.site.register(Role)
admin.site.register(User)
admin.site.register(Status)
admin.site.register(Type)
admin.site.register(Category)
admin.site.register(Section)
admin.site.register(Reconnaissance)
admin.site.register(Question)
admin.site.register(Gallery)
admin.site.register(UserStatus)